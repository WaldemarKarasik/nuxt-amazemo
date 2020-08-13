const router = require("express").Router();

router.post("/edit-user", async (req, res) => {
  try {
    const modifiedUser = await req.userModel.findOneAndUpdate(
      { _id: req.body.userId },
      req.body.userInfo,
      { new: true }
    );
    return res.json(modifiedUser);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
module.exports = router;
