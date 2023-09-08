const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  fromUser: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
  },
  toUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  status: {
    type: Number,
    enums: [
      0, //addFriend
      1, //requestFriend
      2, //pending
      3, //friends
    ]
  }
  
}, {timestamps:true});


module.exports = friendRequestSchema;