const router = require('express').Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ msg: "Email already exists!" });

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password, 
        });

        const user = await newUser.save();
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        if (user.password !== req.body.password) {
            return res.status(400).json({ msg: "Wrong password" });
        }
        res.status(200).json({ 
            user: {
                _id: user._id,      
                name: user.name,
                email: user.email,
                bio: user.bio,
                profilePic: user.profilePic,
                resume: user.resume,
                roadmap: user.roadmap
            } 
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;