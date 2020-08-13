const JWT = require("jsonwebtoken");
const router = require("express").Router();
const bcryptjs = require("bcryptjs");

router.post("/login", async (req, res) => {
  try {
    const user = await req.userModel.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Некорректные данные");
    }
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      throw new Error("Некорректные данные");
    }
    const token = await JWT.sign({ sub: user.email }, "secret");
    return res.json({ token: user.email });
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await req.userModel.findOne({ email });
    if (userExists) {
      throw Error("Пользователь с таким email уже зарегистрирован");
    }
    const newUser = new req.userModel({ email, password });
    await newUser.save();
    return res.json({ ok: true, user: newUser });
  } catch (e) {
    return res.status(500).json(e.message);
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
    // if (user.password == password) {
    //   return res.json(true);
    // } else {
    //   return res.json(false);
    // }
    user.comparePasswords(password, isMatch => {
      if (isMatch) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    });
  } else {
    return res.status(403).json("Не удалось найти пользователя");
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await req.userModel.find({});
    return res.json(users);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = router;
