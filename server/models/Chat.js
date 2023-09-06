const { Schema, model } = require('mongoose');

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
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Chat = model('Chat', chatSchema);

module.exports = Chat;