const express = require("express");
const {
  getAllProducts,
  purchaseProducts,
} = require("../controllers/product.controllers");

const route = express.Router();

route.get("/all", getAllProducts);
route.post("/purchase", purchaseProducts);

module.exports = route;
