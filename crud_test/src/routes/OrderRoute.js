const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

// List all orders
router.get("/", orderController.list);
// Get order by ID
router.get("/:id", orderController.detail);
// Create order
router.post("/create", orderController.create);
// Update order
router.post("/update/:id", orderController.update);
// Delete order
router.post("/delete/:id", orderController.delete);

module.exports = router; 