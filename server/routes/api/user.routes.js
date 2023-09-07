const router = require('express').Router();
const { 
  find,
  findById,
  create,
  update,
  updateById,
  remove 
} = require('../../controllers/user.controller');

router.get("/", async (req, res) => {
  // req.query is a query param in the route --http://test.com/(-you can add other logic here-)?q=(query.here) creating req.query
  try {
    const payload = await find(req.query)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const payload = await findById(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await create(req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    console.log(err)
    return res.status(400).json({ status: "error", msg: err })
  }
})

router.put("/", async (req, res) => {
  try {
    const payload = await update(req.query, req.body)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg: err.msg })
  }
})


/*
This can be used for the findByIdAndUpdate if we switch from the above put
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
    const payload = await remove(id)
    return res.status(200).json({ status: "success", payload })
  } catch(err) {
    return res.status(400).json({ status: "error", msg })
  }
})


module.exports = router;
