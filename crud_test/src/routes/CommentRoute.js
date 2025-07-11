const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

// List all comments
router.get("/", commentController.list);
// Comunidad feed route
router.get('/comunidad', commentController.comunidadFeed);
// Get comment by ID
router.get("/:id", commentController.detail);
// Create comment
router.post("/create", commentController.create);
// Update comment
router.post("/update/:id", commentController.update);
// Delete comment
router.post("/delete/:id", commentController.delete);

module.exports = router; 