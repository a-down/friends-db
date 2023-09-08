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



async function updateComment(criteria) {
	const { id, commentId, commentText } = criteria
	console.log(id, commentId, commentText)
	// NEED TO ADD NEW so mongo sends the new info

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
	console.log(criteria)
	const { id, commentId } = criteria
	console.log(id, commentId)
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
		// if (process.env.NODE_ENV === "development") 
		console.log(err)
		throw new Error(err)
	}
}

// findByIdAndUpdate(postId, {
// 	'$pull': {
// 		'comments': { '_id': commentId }
// 	}
// })
// {
// 	_id: postId, "comments._id": commentId
// }



module.exports = {
	createComment,
	updateComment,
	deleteComment,
}


