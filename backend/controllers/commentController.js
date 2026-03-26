const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
    try {
        const comment = await commentService.addComment(req.params.postId, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPostComments = async (req, res) => {
    try {
        const comments = await commentService.getCommentsByPost(req.params.postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};