// Comment Schema 

const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    trim: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = { commentSchema }
