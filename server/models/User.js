const mongoose = require('mongoose');

// Define Chat Schema
const UserSchema = new mongoose.Schema({
  photo: {
    type: String,
  },
  chatName: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  latestMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

// Create Chat model
const User = mongoose.model('User', UserSchema);

module.exports = User;
