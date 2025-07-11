const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');

// Middleware to check if user is admin
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.rol === 'admin') {
    return next();
  }
  return res.status(403).send('Acceso denegado: solo administradores');
}

// Admin dashboard: list products
router.get('/', isAdmin, async (req, res) => {
  try {
    const products = await Product.find({});
    const categories = await Category.find({});
    res.render('admin', { products, categories, cart: req.session.cart || [], user: req.session.user });
  } catch (err) {
    res.status(500).send('Error al cargar productos');
  }
});

// Add product
router.post('/products/create', isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio, imagen } = req.body;
    if (!nombre || !descripcion || !categoria || precio === undefined || !imagen) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
    const newProduct = new Product({
      nombre,
      descripcion,
      categoria,
      variaciones: [{ tipo: 'default', valor: 'default', precio: Number(precio), stock: 0 }],
      imagenes: [imagen],
      etiquetas: []
    });
    await newProduct.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(400).send('Error al agregar producto');
  }
});

// Update product
router.post('/products/update/:id', isAdmin, async (req, res) => {
  try {
    const { nombre, descripcion, categoria, precio, imagen } = req.body;
    if (!nombre || !descripcion || !categoria || precio === undefined || !imagen) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).send('Producto no encontrado');
    product.nombre = nombre;
    product.descripcion = descripcion;
    product.categoria = categoria;
    product.imagenes = [imagen];
    if (product.variaciones && product.variaciones.length > 0) {
      product.variaciones[0].precio = Number(precio);
    } else {
      product.variaciones = [{ tipo: 'default', valor: 'default', precio: Number(precio), stock: 0 }];
    }
    await product.save();
    res.redirect('/admin');
  } catch (err) {
    res.status(400).send('Error al actualizar producto');
  }
});

// Delete product
router.post('/products/delete/:id', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    res.status(400).send('Error al eliminar producto');
  }
});

module.exports = router; 