const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./App/config/connectDB");
const router = require("./App/routes/index");
const cookieParser = require("cookie-parser");
const { app, server } = require("./App/socket/index");

// Middleware setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 5173;

// Database connection and server start
connectDB().then(() => {
    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});