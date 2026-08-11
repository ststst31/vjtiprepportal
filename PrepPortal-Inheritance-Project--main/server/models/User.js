const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // 1. Auth
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // 2. Profile Details
    bio: { type: String, default: "" },
    skills: { type: String, default: "" }, 
    year: { type: String, default: "" },
    branch: { type: String, default: "" },
    
    // 3. Links
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    profilePic: { type: String, default: "" }, 
    resume: { type: String, default: "" },

    // 4. The Roadmap 
    roadmap: [
        {
            title: { type: String },  
            status: { type: String }   
        }
    ],

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);