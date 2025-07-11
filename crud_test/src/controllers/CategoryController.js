const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");

// List all categories
exports.list = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render("category", { categories, cart: req.session.cart || [] });
  } catch (err) {
    res.status(500).send("Error fetching categories");
  }
};

// Get category detail (with products)
exports.detail = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send("Category not found");
    const products = await Product.find({ categoria: category.nombre });
    category.products = products;
    res.render("category_detail", { category, cart: req.session.cart || [] });
  } catch (err) {
    res.status(500).send("Error fetching category");
  }
};

// Create category
exports.create = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.redirect("/categories");
  } catch (err) {
    res.status(400).send("Error creating category");
  }
};

// Update category
exports.update = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/categories");
  } catch (err) {
    res.status(400).send("Error updating category");
  }
};

// Delete category
exports.delete = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect("/categories");
  } catch (err) {
    res.status(400).send("Error deleting category");
  }
}; 