const UserModel = require("../models/UserModel");

async function checkEmail(request, response) {
    try {
        const { email } = request.body;

        // Validate email input (basic check)
        if (!email) {
            return response.status(400).json({
                message: "Email is required",
                error: true
            });
        }

        // Find the user by email, excluding the password field
        const checkEmail = await UserModel.findOne({ email }).select("-password");

        if (!checkEmail) {
            return response.status(404).json({
                message: "User does not exist",
                error: true
            });
        }

        // Email found, return success response
        return response.status(200).json({
            message: "Email verified",
            success: true,
            data: checkEmail
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "An unexpected error occurred",
            error: true
        });
    }
}

module.exports = checkEmail;