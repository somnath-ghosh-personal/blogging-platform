const Comment = require('../models/Comment');


exports.addComment = async (postId, commentData) => {
    const { name, content } = commentData;
    
    // We create the comment and link it to the postId
    const comment = await Comment.create({
        postId,
        name,
        content
    });
    
    return comment;
};

// Get all comments for a specific post
exports.getCommentsByPost = async (postId) => {
    return await Comment.find({ postId }).sort({ createdAt: -1 }); // Newest first
};