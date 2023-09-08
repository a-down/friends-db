const { ObjectId } = require('mongodb');
const { Post } = require('../models');


async function createComment(criteria) {
	console.log(criteria)
	const { id, ...modifiedCriteria } = criteria
	console.log(id, modifiedCriteria)
	// NEED TO ADD NEW so mongo sends the new info
	try {
		const findPostAndComment = await Post.findById(id).updateOne({ $addToSet: { comments: modifiedCriteria } })
		return findPostAndComment
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err)
		throw new Error(err)
	}
}

// db.collection.updateOne(
// 	{ <query selector> },
// 	{ <update operator>: { "array.$.field" : value } }
// )

async function updateComment(criteria) {
	const { id, commentId, commentText } = criteria
	console.log(id, commentId, commentText)
	try {
		const findPostandUpdate = await Post.updateOne(
			{ 
				_id: id, "comments._id": commentId 
			},
			{
				$set: { "comments.$.commentText": commentText }
			})
		return findPostandUpdate
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err)
		throw new Error(err)
	}
}

// export const getComments = async (req, res) => {
//     try {
//     const comments = await Comment.find();
//     res.status(200).json(comments);
//  } catch (error) {
//     res.status(500).json({message: error.message});
//     }
// }
// export const createComment = async (req, res) => {
//     try {
// 		const newComment = new Comment(req.body);
// 		const savedComment = await newComment.save();
// 		res.status(200).json(savedComment);
// 	} catch (error) {
// 		res.status(500).json({message: error.message});
// 	}
// }
// export const updateComment = async (req, res) => {
//     try {
//         const updatedComment = await Comment.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             {new: true}
//         );
//         res.status(200).json(updatedComment);
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// }
// export const deleteComment = async (req, res) => {
//     try {
// 		const comment = await Comment.findById(req.params.id);
// 		if(!comment) {
// 			return res.status(404).json({ message: "Comment not found" });
// 		}
// 		await comment.remove();
// 		res.status(200).json({ message: "Comment removed" });
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// }
// export const getCommentById = async (req, res) => {
//     try {
// 		const comment = await Comment.findById(req.params.id);
// 		if(!comment) {
// 			return res.status(404).json({ message: "Comment not found" });
// 		}
// 		res.status(200).json(comment);
// 	} catch (error) {
// 		res.status(500).json({ message: error.message });
// 	}
// }


module.exports = {
	createComment,
	updateComment,
}


