const express = require("express")
const registerUser = require("../Controller/registerUser")
const checkEmail = require("../Controller/checkEmail")
const cheaclPasswrod = require("../Controller/checkPassword")
const userDetails = require("../Controller/userDetails")
const logout = require("../Controller/logout")

const router = express.Router()

//create user api
router.post("/register", registerUser)
//cheack user email
router.post("/email", checkEmail)
//check user Password 
router.post("/password", cheaclPasswrod)
// login user deatails
router.get("/user-details", userDetails)
// logout user
router.get("/logout", logout)

module.exports = router