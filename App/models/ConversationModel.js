const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: ""
    },
    videoUrl: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})
const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "User"
    },
    message: [
        {
            type: mongoose.Schema.ObjectId,
            ref: ""
        }
    ]
}, {
    timestamps: true
})

const MessageModel = mongoose.model("Message", messageSchema)
const conversationModel = mongoose.model("Conversation", conversationSchema)

module.exports = { MessageModel, conversationModel }