const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Not used atm
            // get: timestamp => moment(timestamp).format('llll')
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

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
        reactions: [reactionSchema],
    },
    // throwing err need to find out why
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true,
    //     },
    //     id: false,
    // }
);
const commentSchema = new Schema({
    text: {
    type: String,
    required: true,
    maxlength: 280
 },
 username: {
    type: String,
    required: true
},
createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => moment(timestamp).format('llll')
},
})

postSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
postSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const Post = model('Post', postSchema);

module.exports = Post;