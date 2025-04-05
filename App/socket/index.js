const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// Create the HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
    },
});


// socket running at http://localhost:8080/

// Handle socket connections
io.on("connection", (socket) => {
    console.log("connect user", socket.id);

    // Handle socket disconnections
    socket.on("disconnect", () => {
        console.log("disconnect user", socket.id);
    });
});

module.exports = { app, server };