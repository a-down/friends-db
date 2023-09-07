const { User, Post, Reaction } = require('../models');

/*
this is not an exhaustive list
    TODO
    populate appropriate data for posts, example - comments or reactions

*/


async function getAllPosts(body) {
    try {
        const posts = await Post.find().populate('user')
        return posts
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function getPostById(id) {
    try {
        const post = await Post.findById(id)
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
        // const post = await Post.findById(req.params.id);
        // if (!post) {
        //     return res.status(404).json({ message: 'Post not found' });
        // }
        // // Check user
        // if (post.user.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({ message: 'You can only update your own post' });
        // }
        // // Update post
        // const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        //     // Allow updating only title and description
        //     $set: {
        //         title: req.body.title || post.title,
        //         description: req.body.description || post.description
        //     }
        // }, { new: true });
        // res.json(updatedPost);
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function deletePost(id) {
    try {
        const removePost = await Post.findByIdAndDelete(id)
        return removePost
        // const post = await Post.findById(req.params.id);
        // if (!post) {
        //     return res.status(404).json({ message: 'Post not found' });
        // }
        // await post.remove();
        // res.json({ message: 'Post removed' });
    } catch (err) {
        if (process.env.NODE_ENV === "development") console.log(err)
        throw new Error(err)
    }
}

async function likePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        const existingReaction = await Reaction.findOne({
            post: req.params.id, user: req.user._id
        });
        // Check if reaction already exists and delete it
        if (existingReaction) {
            await existingReaction.remove();
        } else {
            // Otherwise create new reaction
            await new Reaction({
                user: req.user._id,
                post: req.params.id
            }).save();
        }

        res.json({ message: 'Reaction added' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function unlikePost(req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const existingReaction = await Reaction.findOneAndDelete({
            post: req.params.id, user: req.user._id
        });

        res.json({ message: 'Reaction removed' });

    } catch (err) {
        res.status(500).json({ message: err.message });
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
}










