const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

// View cart
router.get("/", cartController.viewCart);

// Add item to cart
router.post("/add", cartController.addToCart);

// Update item quantity
router.post("/update", cartController.updateQuantity);

// Remove item from cart
router.post("/remove", cartController.removeFromCart);

// Clear cart
router.post("/clear", cartController.clearCart);

module.exports = router; 