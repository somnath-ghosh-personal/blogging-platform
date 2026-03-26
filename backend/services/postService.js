const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (postData, userId) => {
    return (await Post.create({ ...postData, author: userId })).populate('author', 'name email');
};

// Get all posts with filter
exports.getAllPosts = async (query = {}) => {
    const { search, sortBy } = query;
    let filter = {};

    if (search) {
        const matchingAuthors = await User.find({ name: { $regex: search, $options: 'i' } }).select('_id');
        const authorIds = matchingAuthors.map(user => user._id);

        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
            { author: { $in: authorIds } }
        ];
    }

    let sort = { createdAt: -1 }; 

    if (sortBy) {
        switch (sortBy) {
            case 'date-asc': sort = { createdAt: 1 }; break;
            case 'date-desc': sort = { createdAt: -1 }; break;
            default: sort = { createdAt: -1 };
        }
    }

    return await Post.find(filter)
        .populate('author', 'name email')
        .sort(sort);
};

// Get a single post by ID
exports.getPostById = async (postId) => {
    return await Post.findById(postId).populate('author', 'name');
};

// Update a post (with ownership check)
exports.updatePost = async (postId, userId, updateData) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    if (post.author.toString() !== userId.toString()) {
        throw new Error('Not authorized to edit this post');
    }

    return await Post.findByIdAndUpdate(postId, updateData, { new: true }).populate('author', 'name');
};

// Delete a post
exports.deletePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new Error('Post not found');

    if (post.author.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this post');
    }

    await post.deleteOne();
    return { message: 'Post removed' };
};