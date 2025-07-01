import express from "express";
import {
  getProductById,
  getProducts,
  createProduct,
} from "../controllers/product.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/:id", getProductById);

export default router;
