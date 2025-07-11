const express = require("express")
const app = express()
const session = require("express-session")

// Conexion a BD
require("./database")

// Motor de Plantillas: EJS
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");


//Usp de formato json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("public"))

// Session middleware for cart and user
app.use(session({
  secret: 'note-neko-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}))

// Initialize cart in session if it doesn't exist
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Make user available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routers
const productRouter = require("./routes/ProductRoute")
const categoryRouter = require("./routes/CategoryRoute")
const commentRouter = require("./routes/CommentRoute")
const orderRouter = require("./routes/OrderRoute")
const cartRouter = require("./routes/CartRoute")
const authRouter = require("./routes/AuthRoute")
const adminRouter = require("./routes/AdminRoute")

app.use("/products", productRouter)
app.use("/categories", categoryRouter)
app.use("/comments", commentRouter)
app.use("/orders", orderRouter)
app.use("/cart", cartRouter)
app.use("/auth", authRouter)
app.use("/admin", adminRouter)

// Add top-level /comunidad route
app.get('/comunidad', (req, res) => {
  res.redirect('/comments/comunidad');
});

// Import Product model
const Product = require("./models/ProductModel");

// Homepage route - fetch and pass products
app.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("index", { products, cart: req.session.cart || [], user: req.session.user });
    } catch (err) {
        res.status(500).send("Error loading homepage");
    }
});

app.listen(3000, ()=>{
    console.log("¡Server UP! en http://localhost:3000/")
})