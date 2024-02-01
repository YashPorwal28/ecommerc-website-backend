const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticateSeller = require("../Authentication/authenticateSeller");
const authorizationSeller = require("../Authorization/authorizationSeller");
const Product = require("../Models/productSchema");
const cloudinary = require("../utils/cloudinary");
const {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductWithCategoryOrName,
  getProductById,
} = require("../Controller/ProductCrud");

// create a product only done by the seller

router.post(
  "/add-products",
  authenticateSeller,
  authorizationSeller,

  createProduct
);

// delete a product only done by the seller

router.delete(
  "/product/:id",
  authenticateSeller,
  authorizationSeller,
  updateProduct
);

// update a product done by the seller

router.put(
  "product/:id",
  authenticateSeller,
  authorizationSeller,
  updateProduct
);

// get all the products ,
router.get("/", async (req, res) => {
  getAllProducts;
});

// Route to get products with optional filtering by category or name
router.get("/products/search", getProductWithCategoryOrName);

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  getProductById;
});

module.exports = router;
