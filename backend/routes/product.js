import express from "express";
import products from "../data/products.js";
const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get("/", (req, res) => {
  res.json(products);
});

// @desc    Get product by ID
// @route   GET /api/products/:id
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

export default router;
