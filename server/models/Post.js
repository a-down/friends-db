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
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [commentSchema],
        likes: [
            {
                type: Schema.Types.ObjectId
            }
        ],
        codeString1: {
            type: String,
        },
        codeString2: {
            type: String,
        },
        imageString1: {
            type: String,
        },
        imageString2: {
            type: String,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post;