const { ObjectId } = require('mongodb');
const { User, Post, } = require('../models');

// Get all posts in the entire server. This is unusable at scale. Need to limit or narrow search.
async function getAllPosts() {
    try {
        const posts = await Post.find().populate('user').populate({ path: 'comments', populate: 'user' })
        return posts
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// Find posts by users friends
async function getFriendsPosts(user) {
    try {
        const records = await Post.find({ user: { $in: user.map((id) => { return new ObjectId(id); }) } })
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
        return records
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// get all posts by userID
async function getUserPosts(id) {
    try {
        const payload = await Post.find({ user: { $in: new ObjectId(id) } })
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
        return payload
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// get post by ID
async function getPostById(id) {
    try {
        const post = await Post.findById(id)
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })
        return post
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// create post from user
async function createPost(body) {
    try {
        const newPost = await Post.create(body);
        return newPost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// Update post
async function updatePost(criteria, body) {
    try {
        const updatePost = await Post.findOneAndUpdate(criteria, body, { new: true })
        return updatePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// delete post by ID
async function deletePost(id) {
    try {
        const removePost = await Post.findByIdAndDelete(id)
        return removePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// add id to like array for a post
async function likePost(criteria = {}) {
    const { id, _id } = criteria
    try {
        const addLikePost = await Post.findByIdAndUpdate(id, {
            $push: { likes: _id }
        })
        return addLikePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

// remove id from like array for post
async function unlikePost(criteria = {}) {
    const { id, _id } = criteria
    try {
        const addLikePost = await Post.findByIdAndUpdate(id, {
            $pull: { likes: _id }
        })
        return addLikePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}


module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    getFriendsPosts,
    getUserPosts,
}










