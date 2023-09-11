const router = require('express').Router();
const {
  createComment,
  updateComment,
  deleteComment,

} = require('../../controllers/comment.controller');

/**
 * NEW COMMENT
 * In req.body Need post ID and then comment body filled with user id and commentText
 * 
 * req.body = {id: postID, user: userID, commentText: comment}
 */
router.post("/", async (req, res) => {
  try {
    const payload = await createComment(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

/**
 * Update COMMENT
 * In req.body Need post ID and then comment body filled with user id and commentText
 * 
 * req.body = {id: postID, commentId: commentId, commentText: comment}
 */
router.put("/", async (req, res) => {
  try {
    const payload = await updateComment(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Delete COMMENT
 * In req.body Need post ID and then comment body filled with user id and commentText
 * 
 * req.params = {id: postID, commentId: commentId}
 */
router.delete("/:id/:commentId", async (req, res) => {
  try {
    const payload = await deleteComment(req.params)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
  }
})


module.exports = router;