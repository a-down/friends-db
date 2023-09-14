const router = require('express').Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  getFriendsPosts,
  getUserPosts,

} = require('../../controllers/post.controller');
const { findById } = require('../../controllers/user.controller');

router.get("/", async (req, res) => {
  try {
    const payload = await getAllPosts()
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ status: "error", err })
  }
});

router.get("/friendsposts/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    console.log(payload)
    const friendsPayload = await getFriendsPosts(payload.friends)
    return res.status(200).json({ status: "success", friendsPayload })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ status: "error", err })
  }
})

/**
 * profile page all myposts
 * http://localhost:6500/api/post/myposts/:id
 * req.params { _id : userId}
 */
router.get("/myposts/:id", async (req, res)=> {
  const id = req.params.id
  try {
    const payload = await getUserPosts(id)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    console.log(err)
    return res.status(400).json({ status: "error", err })
  }
});


router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await getPostById(id)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createPost(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.put("/", async (req, res) => {
  try {
    const payload = await updatePost(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})


/**
 * Like Post
 * http://localhost:6500/api/post/:id
 * req.body { _id : userId }
 * req.params { _id : postId}
 */
router.put("/like/:id", async (req, res) => {
  const id = req.params.id
  console.log(id, req.body.id)
  try {
    const payload = await likePost({ id: id, _id: req.body.id })
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.put("/unlike/:id", async (req, res) => {
  const id = req.params.id
  console.log(id, req.body.id)
  try {
    const payload = await unlikePost({ id: id, _id: req.body.id })
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.delete("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await deletePost(id)
    return res.status(200).json({ status: "success", payload })
  } catch (err) {
    return res.status(400).json({ status: "error", msg })
  }
})


module.exports = router;