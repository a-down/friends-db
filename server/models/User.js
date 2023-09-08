const { Schema, model } = require('mongoose');
const friendRequestSchema = require('./FriendReq');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
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
      type: Schema.Types.ObjectId,
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
  friendRequest: [friendRequestSchema]
});

userSchema.method("verify", async function (pw) {
  return await bcrypt.compare(pw, this.password)
})

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})


const User = model('User', userSchema);

module.exports = {
  User,
  friendRequestSchema,
};
