const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true
  },
  tag: {
    type: String,
  },
  linkUrl: {
    type: String,
  },
  author: {
    type: String,
    default: "Anonymous"
  },
  email: {
    type: String
  },
  profilePic: {
    type: String
  },
  upvotes: {
    type: [String],
    default: []
  },
  comments: [
    {
      author: String,
      content: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);

