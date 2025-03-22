const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./App/config/connectDB")

const router = require("./App/routes/index")


const app = express()


app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())


const PORT = process.env.PORT || 3000;


app.use("/api", router)




connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

