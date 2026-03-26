const express = require('express');
const router = express.Router();
const commentRoutes = require('./commentRoutes');
const { getPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected Routes 
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.use('/:postId/comments', commentRoutes);

module.exports = router;