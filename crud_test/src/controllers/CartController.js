const Product = require("../models/ProductModel");

// View cart
exports.viewCart = async (req, res) => {
    try {
        const cart = req.session.cart || [];
        let cartItems = [];
        let total = 0;

        // Get product details for each cart item
        for (let item of cart) {
            const product = await Product.findById(item.productId);
            if (product) {
                const price = product.variaciones && product.variaciones[0] ? product.variaciones[0].precio : 0;
                cartItems.push({
                    ...item,
                    product: product,
                    price: price,
                    subtotal: price * item.quantity
                });
                total += price * item.quantity;
            }
        }

        res.render("cart", { cartItems, total, cart: req.session.cart || [] });
    } catch (err) {
        res.status(500).send("Error loading cart");
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        
        if (!productId) {
            return res.status(400).send("Product ID is required");
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Initialize cart if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if item already exists in cart
        const existingItemIndex = req.session.cart.findIndex(item => item.productId === productId);
        
        if (existingItemIndex > -1) {
            // Update quantity if item already exists
            req.session.cart[existingItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new item to cart
            req.session.cart.push({
                productId: productId,
                quantity: parseInt(quantity)
            });
        }

        res.redirect(`/products/${productId}`);
    } catch (err) {
        res.status(500).send("Error adding to cart");
    }
};

// Update item quantity
exports.updateQuantity = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        
        if (!req.session.cart) {
            return res.status(400).send("Cart is empty");
        }

        const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
        
        if (itemIndex > -1) {
            if (parseInt(quantity) <= 0) {
                // Remove item if quantity is 0 or negative
                req.session.cart.splice(itemIndex, 1);
            } else {
                req.session.cart[itemIndex].quantity = parseInt(quantity);
            }
        }

        res.redirect("/cart");
    } catch (err) {
        res.status(500).send("Error updating cart");
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        
        if (!req.session.cart) {
            return res.status(400).send("Cart is empty");
        }

        const itemIndex = req.session.cart.findIndex(item => item.productId === productId);
        
        if (itemIndex > -1) {
            req.session.cart.splice(itemIndex, 1);
        }

        res.redirect("/cart");
    } catch (err) {
        res.status(500).send("Error removing from cart");
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        req.session.cart = [];
        res.redirect("/cart");
    } catch (err) {
        res.status(500).send("Error clearing cart");
    }
}; 