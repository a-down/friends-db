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

} = require('../../controllers/post.controller');
const { findById } = require('../../controllers/user.controller');

router.get("/", async (req, res) => {
  // the find(req.query) might need to be looked at
  try {
    // this query would be massive at scale but I think we can limit it, I will look into this if theres time -pat
    const payload = await getAllPosts()
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
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
  } catch(err) {
    console.log(err)
    return res.status(400).json({ status: "error", err })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await getPostById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createPost(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
  }
})

router.put("/", async (req, res) => {
  // this might need adjustment on backend to handle different datas
  // example on how to access the req.query 
  // http://localhost:6500/api/post/?_id=64f9d30f44ef1f770483fa79
  try {
    const payload = await updatePost(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", err })
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