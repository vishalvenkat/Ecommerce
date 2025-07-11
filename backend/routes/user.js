import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/user.js";
import { protect, admin } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/", protect, admin, getAllUsers);

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Dynamic route last to avoid conflicts
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById)
  .delete(protect, admin, deleteUserById);

export default router;
