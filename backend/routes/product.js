import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
  })
);

// @desc    Get product by ID
// @route   GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    res.status(404);
    throw new Error("Product not found");
  })
);

export default router;
