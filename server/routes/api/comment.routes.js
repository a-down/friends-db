const router = require('express').Router();
const {
  createComment

} = require('../../controllers/comment.controller');
const { findById } = require('../../controllers/user.controller');

/**
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

router.put("/", async (req, res) => {
  // example on how to access the req.query 
  // http://localhost:6500/api/post/?_id=64f9d30f44ef1f770483fa79
  try {
    const payload = await updatePost(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})
/*
Not used atm
router.put("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await updateById(id, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})
*/
router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await deletePost(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

// need LIKE AND UNLIKE


module.exports = router;