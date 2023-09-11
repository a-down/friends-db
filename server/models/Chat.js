const mongoose = require('mongoose');
const messageSchema = require('./Message')

// Define Chat Schema
const chatSchema = new mongoose.Schema({
  user1:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  user2:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  messages: [messageSchema]



});

// Create User model
const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
