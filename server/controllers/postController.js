// controllers/postController.js
const Post = require('../models/postModel');
const User = require('../models/userModel')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

exports.uploadImage = upload.single('image');

exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        const newPost = await Post.create({
            title,
            content,
            image: req.file ? req.file.path : '',
            user: req.user.id
        });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('user', 'username')
        .populate({
          path: 'comments.user',
          model: User,
          select: 'username'
        })
        .sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// New function to get posts by the logged-in user
exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id }).populate('user', 'username').sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id).populate('user', 'username').populate('comments.user', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      if (post.user.toString() === req.user.id) {
        return res.status(400).json({ message: 'You cannot like your own post' });
      }
  
      if (post.likes.some(like => like.user.toString() === req.user.id)) {
        post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
      } else {
        post.likes.push({ user: req.user.id });
      }
  
      await post.save();
      res.status(200).json(post.likes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const newComment = { user: req.user.id, comment };
      post.comments.push(newComment);
      await post.save();
      
      // Populate the user field in the newly added comment
      await post.populate({
        path: 'comments.user',
        model: User,
        select: 'username'
      }).execPopulate();
  
      res.status(201).json(post.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteComment = async (req, res) => {
    const { id, commentId } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        post.comments.pull(commentId);
        await post.save();
        res.status(200).json(post.comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
