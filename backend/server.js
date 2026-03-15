//Load environment variables from the .env file
require("dotenv").config(); 


const connectDB = require("./config/db");


//This line imports the express framework
const express = require("express");


// Creates Express application
const app = express(); 


// Importing the user Schema
const User = require("./models/user");


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


const PORT = 5000;

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${PORT}`);
});