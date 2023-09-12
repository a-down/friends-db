const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
  {
    from: {
      type:Schema.Types.ObjectId,
      ref: "User",
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      trim: true,
    },
  },
);
const Message = model('Message', messageSchema);

module.exports = {
  messageSchema,
  Message
}