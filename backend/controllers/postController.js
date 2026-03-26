const postService = require('../services/postService');

exports.createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body, req.user._id);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        // Pass query params  (search, sortBy) to the service
        const posts = await postService.getAllPosts(req.query);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
    } catch (error) {
        res.status(400).json({ message: 'Invalid ID' });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.user._id, req.body);
        res.json(updatedPost);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const response = await postService.deletePost(req.params.id, req.user._id);
        res.json(response);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};