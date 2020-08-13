const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./db/index");
const setupModels = require("./db/middlewares/setupModels");

app.use(express.json());
app.use(setupModels);
app.use("/products", require("./routes/products.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/categories", require("./routes/categories.routes"));
app.use("/admin", require("./routes/admin.routes"));

module.exports = {
  path: "/api",
  handler: app
};
