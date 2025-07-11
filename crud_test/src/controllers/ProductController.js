const Product = require("../models/ProductModel");
const Comment = require("../models/CommentModel");

// List all products
exports.list = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("index", { products, cart: req.session.cart || [] });
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};

// Get product detail (with comments)
exports.detail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    const comments = await Comment.find({ productoId: product._id }).sort({ fecha: -1 });
    res.render("product_detail", { product, comments, cart: req.session.cart || [] });
  } catch (err) {
    res.status(500).send("Error fetching product");
  }
};

// Create product
exports.create = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect("/products");
  } catch (err) {
    res.status(400).send("Error creating product");
  }
};

// Update product
exports.update = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/products");
  } catch (err) {
    res.status(400).send("Error updating product");
  }
};

// Delete product
exports.delete = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
  } catch (err) {
    res.status(400).send("Error deleting product");
  }
}; 