const { ObjectId } = require('mongodb');
const { Post } = require('../models');


async function createComment(criteria) {
	const { id, ...modifiedCriteria } = criteria
	try {
		const findPostAndComment = await Post.findById(id).updateOne({ $addToSet: { comments: modifiedCriteria } })
		return findPostAndComment
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err)
		throw new Error(err)
	}
}



async function updateComment(criteria) {
	const { id, commentId, commentText } = criteria
	try {
		const findPostAndUpdate = await Post.updateOne(
			{
				_id: id, "comments._id": commentId
			},
			{
				$set: { "comments.$.commentText": commentText }
			})
		return findPostAndUpdate
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err)
		throw new Error(err)
	}
}
async function deleteComment(criteria) {
	const { id, commentId } = criteria
	try {
		const findPostAndDelete = await Post.updateOne(
			{
				_id: id
			},
			{
				$pull: {comments: {"_id": commentId}}
			}
		)
		return findPostAndDelete
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err)
		throw new Error(err)
	}
}

module.exports = {
	createComment,
	updateComment,
	deleteComment,
}


