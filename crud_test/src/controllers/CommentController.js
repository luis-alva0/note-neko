const Comment = require("../models/CommentModel");
const Product = require("../models/ProductModel");

// List all comments
exports.list = async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.json(comments);
  } catch (err) {
    res.status(500).send("Error fetching comments");
  }
};

// Get comment detail
exports.detail = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send("Comment not found");
    res.json(comment);
  } catch (err) {
    res.status(500).send("Error fetching comment");
  }
};

// Create comment (redirect to product detail)
exports.create = async (req, res) => {
  try {
    const { productoId, nombreUsuario, texto } = req.body;
    
    // Validate required fields
    if (!productoId || !nombreUsuario || !texto) {
      console.log("Missing required fields:", { productoId, nombreUsuario, texto });
      return res.status(400).send("Missing required fields: productoId, nombreUsuario, texto");
    }

    // Create comment without usuarioId (since we don't have user auth yet)
    const newComment = new Comment({
      productoId: productoId,
      nombreUsuario: nombreUsuario,
      texto: texto,
      fecha: new Date()
    });

    await newComment.save();
    console.log("Comment created successfully:", newComment._id);
    res.redirect(`/products/${productoId}`);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(400).send("Error creating comment: " + err.message);
  }
};

// Update comment
exports.update = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Comment updated");
  } catch (err) {
    res.status(400).send("Error updating comment");
  }
};

// Delete comment
exports.delete = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send("Comment deleted");
  } catch (err) {
    res.status(400).send("Error deleting comment");
  }
};

// Comunidad feed: show all comments from all users, most recent first
exports.comunidadFeed = async (req, res) => {
  try {
    // Get all comments, populate product info, sort by most recent
    const comments = await Comment.find({})
      .populate('productoId', 'nombre imagenes')
      .sort({ fecha: -1 })
      .lean();
    res.render('comunidad', {
      comments,
      user: req.user,
      cart: req.session.cart || []
    });
  } catch (err) {
    console.error('Error in comunidadFeed:', err);
    res.status(500).send('Error al cargar el feed de la comunidad');
  }
}; 