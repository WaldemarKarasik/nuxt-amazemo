const JWT = require("jsonwebtoken");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  try {
    const user = await req.userModel.findOne({ email: req.body.email });
    if (user && user.password === req.body.password) {
      const token = await JWT.sign({ sub: user.email }, "secret");
      return res.json({ token: user.email });
    } else {
      return res
        .status(403)
        .json({ message: "Некорректные данные", ok: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Error");
  }
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(403)
      .json({ ok: false, message: "Не удалось получить токен" });
  }
  // const userEmail = await JWT.verify(token, "secret");
  if (token) {
    const user = await req.userModel.findOne({ email: token });
    if (user) {
      return res.json({ user });
    } else {
      return res.status(403).json({
        ok: false,
        message: "Не удалось получить пользователя из токена"
      });
    }
  }
});

router.post("/compare-password", async (req, res) => {
  const { password, _id } = req.body;
  const user = await req.userModel.findOne({ _id });
  if (user) {
    if (user.password == password) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  } else {
    return res.status(403).json("Не удалось найти пользователя");
  }
});

module.exports = router;
