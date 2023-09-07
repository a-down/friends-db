const { Schema, model } = require('mongoose');
const { commentSchema } = require('./Comment')

const postSchema = new Schema(
    {
        postText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: timestamp => moment(timestamp).format('llll')
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema],
    }
);

const Post = model('Post', postSchema);

module.exports = Post;