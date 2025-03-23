const UserModel = require("../models/UserModel")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")


async function cheaclPasswrod(request, response) {
    try {
        const { password, userId } = request.body

        const user = await UserModel.findById(userId)


        const verifyPassword = await bcryptjs.compare(password, user.password)

        if (!verifyPassword) {
            return response.status(400).json({
                message: "Please check password",
                error: true
            })
        } else {
            const tokenData = {
                id: user._id,
                email: user.email
            }

            const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, { expiresIn: `1d` });

            const cookieOptions = {
                httpOnly: false, // Makes the cookie inaccessible via client-side scripts
                secure: true    // Ensures the cookie is sent only over HTTPS
            };


            return response.cookie("token", token, cookieOptions).status(200).json({
                message: "Login successfully",
                token: token,
                data: user,
                success: true
            })
        }

    }

    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })

    }
}


module.exports = cheaclPasswrod