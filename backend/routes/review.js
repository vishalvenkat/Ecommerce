import express from "express";
import { protect } from "../middleware/authHandler.js";
import { createReview } from "../controllers/review.js";

const router = express.Router();

router.route("/").post(protect, createReview);

export default router;
