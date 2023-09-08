const router = require('express').Router();
const { addFriend } = require('../../controllers/friend.controller');
const { find } = require('../../controllers/user.controller');

/**
 * Search friends
 * use a useEffect for on change keypresses to perfrom this get req
 * using the state of the form being typed into as search params
 * 
 * req.query = { username: userID }
 * http://localhost:6500/api/friend/find?=req.query
 */
router.get("/find", async (req, res) => {
  console.log(req.query)
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

/**
 * Add friend
 * 
 * http://localhost:6500/api/friend/find
 * req.body { id: _id, toUser: _id }
 */
router.post("/find", async (req, res) => {
  console.log(req.body)
  try {
    const payload = await addFriend(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * NEW COMMENT
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