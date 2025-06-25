import {
  AddToCart,
  getMyOrders,
  getMyOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from "../controllers/order.js";
import express from "express";
import { protect, admin } from "../middleware/authHandler.js";
const router = express.Router();

router.get("/all", protect, getMyOrders);

// 2. POST and GET / (no ID)
router.route("/").post(protect, AddToCart).get(protect, admin, getAllOrders);

// 3. PUT /:id/pay
router.put("/:id/pay", protect, updateOrderToPaid);

// 4. PUT /:id/delivered
router.put("/:id/delivered", protect, updateOrderToDelivered);

// 5. GET /:id → place this LAST to avoid conflicts
router.get("/:id", protect, getMyOrderById);

export default router;
