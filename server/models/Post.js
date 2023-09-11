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
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [commentSchema],
        codeString1: {
            type: String,
        },
        codeString2: {
            type: String,
        },
        imageString1: {
            type: String,
        },
        imageString1: {
            type: String,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post;