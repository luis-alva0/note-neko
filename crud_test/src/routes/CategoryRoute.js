const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");

// List all categories
router.get("/", categoryController.list);
// Get category by ID
router.get("/:id", categoryController.detail);
// Create category
router.post("/create", categoryController.create);
// Update category
router.post("/update/:id", categoryController.update);
// Delete category
router.post("/delete/:id", categoryController.delete);

// Comunidad redirect
router.get('/comunidad', (req, res) => res.redirect('/comments/comunidad'));

module.exports = router; 