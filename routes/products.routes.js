const express = require("express");
const {
  getAllProducts,
  purchaseProducts,
  getHisotory,
  updateProduct,
} = require("../controllers/product.controllers");

const route = express.Router();

route.get("/all", getAllProducts);
route.post("/purchase", purchaseProducts);
route.patch("/update", updateProduct);
route.get("/history", getHisotory);

module.exports = route;
