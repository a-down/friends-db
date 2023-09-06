const {User, Post, Reaction } = require('../models');

module.exports = {
    async getAllPosts(req, res) {
        try {
            const posts = await Post.find().populate('user');
            res.json(posts);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async getPostById(req, res) {
        try {
            const post = await Post.findById(req.params.id).populate('user');
            if(!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async createPost(req, res) {
        const newPost = new Post({
            ...req.body,
            user: req.user._id
        });

        try {
            const post = await newPost.save();
            res.status(200).json(post);
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
    },
    async updatePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            // Check user
            if(post.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'You can only update your own post' });
            }  
            // Update post
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, {   
                // Allow updating only title and description
                $set: {
                    title: req.body.title || post.title,
                    description: req.body.description || post.description
                }
            }, {new: true});
            res.json(updatedPost);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async deletePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            await post.remove();
            res.json({ message: 'Post removed' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async likePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(!post) return res.status(404).json({message: 'Post not found'});
            const existingReaction = await Reaction.findOne({
                post: req.params.id, user: req.user._id});
                // Check if reaction already exists and delete it
                if(existingReaction) {
                    await existingReaction.remove();
                    } else {
                // Otherwise create new reaction
                    await new Reaction({
                        user: req.user._id,
                        post: req.params.id
                    }).save();
                }

                res.json({message: 'Reaction added'});

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    },

    async unlikePost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if(!post) return res.status(404).json({message: 'Post not found'});

            const existingReaction = await Reaction.findOneAndDelete({
                post: req.params.id, user: req.user._id});

            res.json({message: 'Reaction removed'});

        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}
                



        





