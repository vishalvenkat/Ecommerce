import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
} from "../controllers/product.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
