const express = require("express"); //This line imports the express framework
const app = express(); // Creates Express application

app.use(express.json()); // Middleware used for JSON parsing

// Root route
app.get("/", (req, res) => {
    res.send("Knowledge Sharing Platform API Running");
});

// Test Route api
app.get("/api/test", (req, res) => {
    res.json({ message: "API working successfully" });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});