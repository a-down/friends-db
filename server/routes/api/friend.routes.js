const router = require('express').Router();
const {
  addFriend,
  pendingFriend,
  confirmFriend,
  deleteFriend,
} = require('../../controllers/friend.controller');
const { 
  find,
  searchUser,
} = require('../../controllers/user.controller');

/**
 * Search friends
 * use a useEffect for on change keypresses to perfrom this get req
 * using the state of the form being typed into as search params
 * 
 * req.query = { username: username }
 * http://localhost:6500/api/friend/find/user?username=${req.query}
 * this may need to be adjusted to search username
 */
router.get("/find/user", async (req, res) => {
  try {
    const payload = await searchUser(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})


router.get("/find", async (req, res) => {
  console.log(req.query)
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})



/**
 * Add friend
 * http://localhost:6500/api/friend/find
 * req.body { id: _id, toUser: _id }
 */
router.post("/add", async (req, res) => {
  console.log(req.body)
  try {
    const payload = await addFriend(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Populate friend requests
 * http://localhost:6500/api/friend/id
 * req.params { id: _id }
 */
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
  try {
    const payload = await pendingFriend(req.params.id)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Confirm friend
 * http://localhost:6500/api/friend/
 * req.body = {id: toUser, fromUser: fromUser, confirm:BOOLEAN}
 * the proper method might be post for this one since we create and update docs
 */
router.put("/", async (req, res) => {
  try {
    const payload = await confirmFriend(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * Delete Friend
 * http://localhost:6500/api/friend/id/friendId
 * req.params = {id: _id, friendId: _id}
 */
router.delete("/:id/:friendId", async (req, res) => {
  try {
    const payload = await deleteFriend(req.params)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})


module.exports = router;