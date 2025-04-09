const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

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


//online user 

const onlineUser = new Set()

// Handle socket connections
io.on("connection", async (socket) => {
    console.log("connect user", socket.id);

    const token = socket.handshake.auth.token

    // corrent user deatails

    const user = await getUserDetailsFromToken(token)


    // create a room 
    socket.join(user?._id)
    onlineUser.add(user?._id?.toString())

    io.emit("onlineUser", Array.from(onlineUser))

    socket.on("message-page", async (userId) => {
        if (!userId) {
            console.error("No userId received");
            // You don't need to fetch user details if userId is missing
            socket.emit("message-user", { error: "Invalid userId" });
        } else {
            try {
                const userDetails = await UserModel.findById(userId).select("-password");

                if (!userDetails) {
                    console.error("User not found for userId:", userId);
                    socket.emit("message-user", { error: "User not found" });
                } else {
                    const payload = {
                        _id: userDetails._id,
                        name: userDetails.name,
                        email: userDetails.email,
                        profile_pic: userDetails?.profile_pic,
                        online: onlineUser.has(userId),
                    };

                    socket.emit("message-user", payload);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
                socket.emit("message-user", { error: "Server error" });
            }
        }
    });


    // Handle socket disconnections
    socket.on("disconnect", () => {
        onlineUser.delete(user?._id)
        console.log("disconnect user", socket.id);
    });
});

module.exports = { app, server };