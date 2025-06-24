import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { generateToken, setTokenInCookie } from "../utils/generateToken.js";

/**
 * User specific controllers
 * These controllers are accessible by all authenticated users.
 */

/* @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    setTokenInCookie(res, token);

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  if (user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.status(404);
  throw new Error("User not found");
});

/* @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  const token = generateToken(user._id);
  setTokenInCookie(res, token);
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
  });
});

/* @desc    Logout user
 * @route   POST /api/users/logout
 * @access  Private
 */
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiration date to the past
  });
  res.json({ message: "User logged out successfully" });
});

/* @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    return res.json(user);
  }
  res.status(404);
  throw new Error("User not found");
});

/* @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  // Only update password if provided in the request body
  // This allows users to update their profile without changing the password
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

/**
 * Admin specific controllers
 * These controllers are only accessible by admin users.
 */

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  }
  res.status(404);
  throw new Error("User not found");
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin =
    req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
