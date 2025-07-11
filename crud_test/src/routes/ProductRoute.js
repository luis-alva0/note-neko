const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

// List all products
router.get("/", productController.list);
// Get product by ID
router.get("/:id", productController.detail);
// Create product
router.post("/create", productController.create);
// Update product
router.post("/update/:id", productController.update);
// Delete product
router.post("/delete/:id", productController.delete);

module.exports = router; 