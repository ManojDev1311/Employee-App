const express = require("express");
const { signUpValidation, logInValidation } = require("../Middlewares/AuthValidation");
const { signup, logIn } = require("../Controllers/AuthController");

const router = express.Router();

// User Signup
router.post("/signup", signUpValidation, signup);

// User Login
router.post("/login", logInValidation, logIn);

module.exports = router;