const { ObjectId } = require('mongodb');
const { User, Post, Reaction } = require('../models');

/*
this is not an exhaustive list
    TODO
    Clean up
    populate appropriate data for posts, example - comments or reactions
    
*/


async function getAllPosts() {
    try {
        const posts = await Post.find().populate('user').populate({ path: 'comments', populate: 'user' })
        return posts
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}
async function getFriendsPosts(user) {
    // let objId = user.map(s => new ObjectId(s))
    // console.log(objId)
    console.log(user[0])
    const o_id = new ObjectId(user[0])
    console.log(o_id)
    try {
        const records = await Post.find({ user: { $in: user.map((id) => { return new ObjectId(id); }) } })
            .populate('user')
            .populate({ path: 'comments', populate: 'user' })


        //.where(user)//.in(ids).exec();  payload.friends.forEach((str) => 
        // console.log(records)   {_id: { $in: user.map(function (id) {return ObjectId(id);})}} user.map(function (id) {return new ObjectId(id);})
        return records
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function getPostById(id) {
    try {
        const post = await Post.findById(id).populate('user').populate({ path: 'comments', populate: 'user' })
        return post
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function createPost(body) {
    try {
        const newPost = await Post.create(body);
        return newPost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function updatePost(criteria, body) {
    // this should work if we only render edit and delete post options for original authors on the front.
    // this might be better as a findByIdAndUpdate
    try {
        console.log(criteria)
        const updatePost = await Post.findOneAndUpdate(criteria, body, { new: true })
        return updatePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function deletePost(id) {
    try {
        const removePost = await Post.findByIdAndDelete(id)
        return removePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function unlikePost(criteria = {}) {
    console.log('hit LIKE')
    console.log(criteria)
    const { id, _id } = criteria
    try {
        const addLikePost = await Post.findByIdAndUpdate(id, {
            likes: _id
        })
        return addLikePost
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function unlikePost(criteria = {}) {
    console.log('hit UNLIKE')
    console.log(criteria)
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
    likePost: unlikePost,
    unlikePost,
    getFriendsPosts,
}










