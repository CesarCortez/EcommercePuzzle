import asyncHandler from "express-async-handler";
import Order from "../models/orderModel";

//@desc     Create new order
//@route    Post /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req:any, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

//@desc     Get order by ID
//@route    Post /api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //populate is used to get the user's name and email from the user model, is like a join in SQL
  
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req:any, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});


// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private

const updateOrderToPayAndDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = new Date(Date.now());
      order.isPaid = true;
      order.paidAt = new Date(Date.now());
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found!");
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    Update order to canceled
// @route   GET /api/orders/:id/cancel
// @access  Private

const updateOrderToCanceled = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.canceled = true;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found!");
    }
  } catch (error) {
    console.log(error);
  }
});

const updateOrderToReview = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.review = req.body;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found!");
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPayAndDelivered,
  updateOrderToReview,
  updateOrderToCanceled
};
