const mongoose = require("mongoose");
const UserSchema = require("../models/user.model");
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
  brand: String,
  image: String,
  price: Number,
  rating: Number,
  numReviews: Number,
  countInStock: Number
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Product" }]
});

async function setupModels(req, res, next) {
  try {
    req.product = mongoose.model("Product");
  } catch {
    req.product = mongoose.model("Product", ProductSchema);
  }
  try {
    req.category = mongoose.model("Category");
  } catch {
    req.category = mongoose.model("Category", CategorySchema);
  }
  try {
    req.userModel = mongoose.model("User");
  } catch {
    req.userModel = mongoose.model("User", UserSchema);
  }
  next();
}
module.exports = setupModels;
