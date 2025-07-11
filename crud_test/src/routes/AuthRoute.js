const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Authentication routes
router.get("/signup", authController.showSignup);
router.post("/signup", authController.signup);
router.get("/login", authController.showLogin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/profile", authController.showProfile);
router.post("/profile", authController.updateProfile);

module.exports = router; 