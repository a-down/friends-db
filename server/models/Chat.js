const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const chatSchema = new Schema(
  {
    photo: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/9790/9790561.png',
    },
    chatName: {
      type: String,
      trim: true,
    },
    isGroup: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
>>>>>>> main
      ref: 'User',
    },
  ],
  userColor: {
    type: String,
  },
<<<<<<< HEAD
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
=======
  {
    timestamps: true,
  }
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;
>>>>>>> main
