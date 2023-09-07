const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  userColor: {
    type: String,
  },
  userBio: {
    type: String,
    required: false,
  },
  userImage: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
