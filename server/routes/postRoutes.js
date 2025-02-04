// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUserPosts, getPosts, deletePost, createPost, getPostById, updatePost, likePost, commentPost, deleteComment } = require('../controllers/postController');

router.route('/').get(getPosts).post(protect, createPost);
router.route('/user-posts').get(protect, getUserPosts); // New route for user's posts
router.route('/:id')
    .get(protect, getPostById)
    .delete(protect, deletePost)
    .put(protect, updatePost);
router.route('/:id/like').put(protect, likePost);
router.route('/:id/comment').post(protect, commentPost);
router.route('/:id/comment/:commentId').delete(protect, deleteComment);

module.exports = router;
