const router = require('express').Router();
const { readDB, writeDB, generateId } = require('../db');

router.post('/register', async (req, res) => {
    try {
        const db = readDB();
        const existingUser = db.users.find(u => u.email === req.body.email);
        if (existingUser) return res.status(400).json({ msg: "Email already exists!" });

        const newUser = {
            _id: generateId(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePic: "",
            bio: "",
            roadmap: []
        };

        db.users.push(newUser);
        writeDB(db);

        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const db = readDB();
        const user = db.users.find(u => u.email === req.body.email);
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