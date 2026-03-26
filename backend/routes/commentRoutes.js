const express = require('express');
const router = express.Router({ mergeParams: true }); 
const { createComment, getPostComments } = require('../controllers/commentController');
const { protect } = require('../middleware/authMiddleware');

// Route: /api/posts/:postId/comments
router.get('/', getPostComments);
router.post('/', protect, createComment); // Protected 
module.exports = router;