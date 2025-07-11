import Review from "../models/reviewModel.js";
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { product, rating, comment } = req.body;

  if (!product || !rating || !comment) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const productExist = await Product.findById(product);

  if (!productExist) {
    res.status(404);
    throw new Error("Product not found");
  }
  const existingReview = await Review.findOne({
    user: req.user._id,
    product: productExist._id,
  });
  if (existingReview) {
    res.status(400);
    throw new Error("You have already reviewed this product");
  }

  const review = new Review({
    user: req.user._id,
    product,
    rating,
    comment,
  });

  const createdReview = await review.save();

  // Update product's rating and numReviews
  productExist.numReviews = (productExist.numReviews || 0) + 1;
  productExist.rating = Number(
    (productExist.rating * (productExist.numReviews - 1) + rating) /
      productExist.numReviews
  );

  await productExist.save();

  res.status(201).json(createdReview);
});

export { createReview };
