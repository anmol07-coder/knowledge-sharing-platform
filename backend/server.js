//Load environment variables from the .env file
require("dotenv").config(); 

const connectDB = require("./config/db");

//This line imports the express framework
const express = require("express");

// Creates Express application
const app = express(); 

// Importing the user Schema
const User = require("./models/user");

// Used for password hashing
const bcrypt = require("bcryptjs");

// Used for creating tokens for authentication and authorization
const jwt = require("jsonwebtoken");



connectDB();




// Middleware used for JSON parsing
app.use(express.json()); 


// Root route
app.get("/", (req, res) => {
    res.send("Knowledge Sharing Platform API Running");
});


// Test Route api
app.get("/api/test", (req, res) => {
    res.json({ message: "API working successfully" });
});


// post/api/users
app.post("/api/users", async (req, res) => {

  const { name, email, password , bio } = req.body;

  const user = new User({
    name,
    email,
    password,
    bio
  });

  await user.save();

  res.json(user);

});

// Register API
app.post("/api/users/register", async (req, res) => {

  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = new User({
    name,
    email,
    password: hashedPassword
  });

  await user.save();

  res.json({ message: "User registered successfully" });

});

// Login API
app.post("/api/users/login", async (req, res) => {

  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // Generate token
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });

});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});