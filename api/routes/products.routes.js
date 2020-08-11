const mongoose = require("mongoose");
const router = require("express").Router();
const ObjectId = mongoose.Schema.Types.ObjectId;

router.get("/all", async (req, res) => {
  if (req.query.id) {
    // const product = data.products.find((x) => x._id == req.query.id);
    const product = await req.product.findOne({ _id: req.query.id }).lean();

    if (product) {
      return res.json(product);
    }
  }
  // console.log(req.dbClient);
  const products = await req.product
    .find()
    .populate("category")
    .lean();
  return res.json(products);
});

router.get("/specific", async (req, res) => {
  const { id } = req.query;

  const product = await req.product
    .findOne({ _id: id })
    .populate("category")
    .lean();
  res.json(product);
});

router.post("/create", async (req, res) => {
  let productData = req.body;
  const product = new req.product(productData);
  try {
    const productCategory = await req.category.findOne({
      _id: req.body.category
    });
    const savedProduct = await product.save();
    productCategory.products.push(savedProduct._id);

    await productCategory.save();
    const productWithCategory = await req.product
      .findOne({ _id: product._id })
      .populate({ path: "category", populate: { path: "products" } });
    return res.status(201).json(productWithCategory);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post("/remove", async (req, res) => {
  const { id } = req.query;
  const deletedProduct = await req.product.findOneAndRemove({ _id: id });
  const category = await req.category.findOne({
    _id: deletedProduct.category._id
  });
  // category.products.pull(deletedProduct._id);
  // console.log(category.products);
  // await category.save();
  await req.category.findByIdAndUpdate(
    deletedProduct.category._id,
    {
      pull: { products: { _id: new ObjectId(deletedProduct._id) } }
    },
    { new: true },
    async function(err, node) {
      // console.log(category);
      if (err) console.log(err);
      const categories = await req.category.find().populate("products");
      return res.json({ product: deletedProduct, categories });
    }
  );
});

module.exports = router;
