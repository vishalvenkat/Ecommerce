import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  product.name = name;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.description = description;
  product.price = price;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Fetch all products
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const allProducts = await Product.find({});
  res.json(allProducts);
});

// @desc    Fetch product by ID
// @route   GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  // Populate reviews with user details
  const reviews = await Review.find({ product: product._id }).populate(
    "user",
    "name"
  );
  return res.json({ product, reviews });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: req.params.id });
    return res.json({ message: "Product removed" });
  }

  res.status(404);
  throw new Error("Product not found");
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
