// Import the User model
require("./models/User");
//
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");
const { mongoUri } = require("./keys");

// instance of the express app
const app = express();
const PORT = 3005;

// Middleware for parsing application/json
app.use(express.json());

// Set up routes for authentication
app.use(authRoutes);

// Connect to MongoDB database
mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Database");
});
mongoose.connection.on("error", (error) => {
    console.log("Error connecting to MongoDB Database", error);
});

// Home route
app.get("/", (req, res) => {
    res.send("Hi there");
});

// Protected route that requires authentication
app.get("/protected", requireAuth, (req, res) => {
    res.send(`Hi User: ${req.user}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}`);
});
