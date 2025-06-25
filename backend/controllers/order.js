import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc    Add to order
// @route   POST /api/orders
// @access  Private
const AddToCart = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No items found");
  }

  const orders = orderItems.map((item) => {
    return {
      name: item.name,
      qty: item.qty,
      image: item.image,
      price: item.price,
      product: item._id,
      _id: undefined,
    };
  });

  const order = new Order({
    user: req.user._id,
    orderItems: orders,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get my orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for this user");
  }
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getMyOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

// @desc    Get all orders to admin
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found");
  }
  res.json(orders);
});

export {
  AddToCart,
  getMyOrders,
  getMyOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
