const express = require("express")
const registerUser = require("../Controller/registerUser")
const checkEmail = require("../Controller/checkEmail")
const cheaclPasswrod = require("../Controller/checkPassword")
const userDetails = require("../Controller/userDetails")
const logout = require("../Controller/logout")
const updateUserDetails = require("../Controller/updateUserDetails")
const searchUser = require("../Controller/searchUser")

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
// update user deatails
router.post("/update-user", updateUserDetails)
// serach user
router.post("/search-user", searchUser)

module.exports = router