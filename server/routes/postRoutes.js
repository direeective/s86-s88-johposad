// routes/postRoutes.js
const express = require('express');
const {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    likePost,
    commentPost,
    deleteComment,
    uploadImage
} = require('../controllers/postController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').post(protect, uploadImage, createPost).get(getPosts);
router.route('/:id').get(getPostById).delete(protect, deletePost);
router.route('/like/:id').put(protect, likePost);
router.route('/comment/:id').post(protect, commentPost);
router.route('/:id/comment/:commentId').delete(protect, admin, deleteComment);

module.exports = router;
