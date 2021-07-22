const express = require("express");
const { getProducts, newProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/product/new").post(newProduct);
router.route("/products").get(getProducts);

module.exports = router;
