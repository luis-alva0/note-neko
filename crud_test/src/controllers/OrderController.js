const Order = require("../models/OrderModel");

// List all orders
exports.list = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
};

// Get order detail
exports.detail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send("Order not found");
    res.json(order);
  } catch (err) {
    res.status(500).send("Error fetching order");
  }
};

// Create order
exports.create = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).send("Error creating order");
  }
};

// Update order
exports.update = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Order updated");
  } catch (err) {
    res.status(400).send("Error updating order");
  }
};

// Delete order
exports.delete = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).send("Order deleted");
  } catch (err) {
    res.status(400).send("Error deleting order");
  }
}; 