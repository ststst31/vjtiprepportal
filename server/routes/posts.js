const router = require('express').Router();
const { readDB, writeDB, generateId } = require('../db');

// Simple auth middleware (reads user ID from header since JWT isn't used)
const requireAuth = (req, res, next) => {
    const userId = req.headers['authorization'];
    if (!userId) return res.status(401).json({ msg: 'Unauthorized' });
    req.user = { id: userId.replace('Bearer ', '').trim() };
    next();
};

// Create a post
router.post('/', requireAuth, async (req, res) => {
    try {
        const db = readDB();
        
        const newPost = {
            _id: generateId(),
            ...req.body,
            author: req.body.author || req.user.id,
            upvotes: [],
            comments: [],
            createdAt: new Date().toISOString()
        };

        db.posts.push(newPost);
        writeDB(db);

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all posts (with optional category/tag filter)
router.get('/', async (req, res) => {
    try {
        const db = readDB();
        const { category, tag } = req.query;
        
        let posts = db.posts;
        
        if (category || tag) {
            const filterTag = category || tag;
            posts = posts.filter(p => p.tag === filterTag);
        }
        
        // Sort descending
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Upvote/Downvote a post
router.put('/:id/vote', requireAuth, async (req, res) => {
    try {
        const db = readDB();
        const postIndex = db.posts.findIndex(p => p._id === req.params.id);
        
        if (postIndex === -1) return res.status(404).json({ msg: "Post not found" });

        const userId = req.user.id;
        const post = db.posts[postIndex];
        
        if (!post.upvotes) post.upvotes = [];

        if (post.upvotes.includes(userId)) {
            post.upvotes = post.upvotes.filter(id => id !== userId);
            writeDB(db);
            res.status(200).json({ msg: "Vote removed", upvotes: post.upvotes });
        } else {
            post.upvotes.push(userId);
            writeDB(db);
            res.status(200).json({ msg: "Voted", upvotes: post.upvotes });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Comment on a post
router.post('/:id/comment', requireAuth, async (req, res) => {
    try {
        const db = readDB();
        const postIndex = db.posts.findIndex(p => p._id === req.params.id);
        
        if (postIndex === -1) return res.status(404).json({ msg: "Post not found" });

        const post = db.posts[postIndex];
        if (!post.comments) post.comments = [];

        const newComment = {
            author: req.user.id,
            content: req.body.content,
            createdAt: new Date().toISOString()
        };

        post.comments.push(newComment);
        writeDB(db);
        
        res.status(200).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
