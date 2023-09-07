const { Schema, model } = require('mongoose');

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
            get: timestamp => moment(timestamp).format('llll')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

postSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('post', postSchema);

module.exports = Post;