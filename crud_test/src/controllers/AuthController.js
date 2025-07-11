const User = require("../models/UserModel");

// Show signup page
exports.showSignup = (req, res) => {
    res.render("auth/signup", { 
        user: req.session.user,
        cart: req.session.cart || [],
        error: null 
    });
};

// Handle signup
exports.signup = async (req, res) => {
    try {
        const { nombre, correo, contraseña, confirmarContraseña } = req.body;

        // Validation
        if (!nombre || !correo || !contraseña) {
            return res.render("auth/signup", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "Todos los campos son requeridos" 
            });
        }

        if (contraseña !== confirmarContraseña) {
            return res.render("auth/signup", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "Las contraseñas no coinciden" 
            });
        }

        if (contraseña.length < 6) {
            return res.render("auth/signup", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "La contraseña debe tener al menos 6 caracteres" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.render("auth/signup", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "El correo ya está registrado" 
            });
        }

        // Create new user
        const newUser = new User({
            nombre,
            correo,
            contraseña
        });

        await newUser.save();

        // Auto-login after signup
        req.session.user = {
            _id: newUser._id,
            nombre: newUser.nombre,
            correo: newUser.correo,
            rol: newUser.rol
        };

        res.redirect("/");
    } catch (err) {
        console.error("Signup error:", err);
        res.render("auth/signup", { 
            user: req.session.user,
            cart: req.session.cart || [],
            error: "Error al crear la cuenta" 
        });
    }
};

// Show login page
exports.showLogin = (req, res) => {
    res.render("auth/login", { 
        user: req.session.user,
        cart: req.session.cart || [],
        error: null 
    });
};

// Handle login
exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        // Validation
        if (!correo || !contraseña) {
            return res.render("auth/login", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "Correo y contraseña son requeridos" 
            });
        }

        // Find user
        const user = await User.findOne({ correo });
        if (!user) {
            return res.render("auth/login", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "Credenciales inválidas" 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(contraseña);
        if (!isMatch) {
            return res.render("auth/login", { 
                user: req.session.user,
                cart: req.session.cart || [],
                error: "Credenciales inválidas" 
            });
        }

        // Set session
        req.session.user = {
            _id: user._id,
            nombre: user.nombre,
            correo: user.correo,
            rol: user.rol
        };

        res.redirect("/");
    } catch (err) {
        console.error("Login error:", err);
        res.render("auth/login", { 
            user: req.session.user,
            cart: req.session.cart || [],
            error: "Error al iniciar sesión" 
        });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.user = null;
    req.session.cart = [];
    res.redirect("/");
};

// Show profile page
exports.showProfile = (req, res) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    
    res.render("auth/profile", { 
        user: req.session.user,
        cart: req.session.cart || [],
        error: null,
        success: null
    });
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect("/auth/login");
        }

        const { nombre, telefono, direccion } = req.body;
        
        const user = await User.findById(req.session.user._id);
        if (!user) {
            return res.redirect("/auth/logout");
        }

        // Update fields
        if (nombre) user.nombre = nombre;
        if (telefono) user.telefono = telefono;
        if (direccion) {
            user.direccion = { ...user.direccion, ...direccion };
        }

        await user.save();

        // Update session
        req.session.user.nombre = user.nombre;

        res.render("auth/profile", { 
            user: req.session.user,
            cart: req.session.cart || [],
            error: null,
            success: "Perfil actualizado correctamente"
        });
    } catch (err) {
        console.error("Profile update error:", err);
        res.render("auth/profile", { 
            user: req.session.user,
            cart: req.session.cart || [],
            error: "Error al actualizar el perfil",
            success: null
        });
    }
}; 