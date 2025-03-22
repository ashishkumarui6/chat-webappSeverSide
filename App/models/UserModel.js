const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "provide name"]
    },
    email: {
        type: String,
        required: [true, "provide email"],
        unique: true
    },
    phone: {
        type: String,
        required: [true, "provide phone"]
    },
    password: {
        type: String,
        required: [true, "provide password"],
        unique: true
    },
    profile_pic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true // Proper placement for enabling timestamps
});


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel