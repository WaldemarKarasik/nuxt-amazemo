const router = require("express").Router();

router.get("/all", async (req, res) => {
  const categories = await req.category
    .find()
    .populate("products")
    .lean();
  return res.json(categories);
});

router.get("/:name", async (req, res) => {
  try {
    const category = await req.category
      .findOne({ name: req.params.name })
      .populate("products");
    if (!category) {
      throw Error("Не удалось найти категорию");
    }
    return res.json(category);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
router.post("/create", async (req, res) => {
  try {
    const createdCategory = new req.category(req.body);
    await createdCategory.save();
    res.status(201).json({ ok: true, category: createdCategory });
  } catch (e) {
    return res.json(e);
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foundCategory = await req.category.findOne({ _id: id });
    if (!foundCategory) {
      throw Error("Категория найдена");
    }
    await foundCategory.remove();
    return res.json(foundCategory);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

module.exports = router;
