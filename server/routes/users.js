const router = require('express').Router();
const { readDB, writeDB } = require('../db');

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const db = readDB();
    const regex = new RegExp(query, 'i');
    
    const users = db.users
      .filter(u => regex.test(u.name))
      .map(u => ({ name: u.name, email: u.email, profilePic: u.profilePic }));

    res.status(200).json(users);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
    try {
        const db = readDB();
        const userIndex = db.users.findIndex(u => u._id === req.params.id);
        
        if (userIndex === -1) {
             return res.status(404).json({ msg: "User not found" });
        }
        
        const updatedUser = { ...db.users[userIndex], ...req.body };
        db.users[userIndex] = updatedUser;
        writeDB(db);
        
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const db = readDB();
        const user = db.users.find(u => u._id === req.params.id);
        
        if (!user) {
             return res.status(404).json({ msg: "User not found" });
        }
        
        const { password, ...other } = user;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
