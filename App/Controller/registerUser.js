const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");

async function registerUser(request, response) {
    try {
        const { name, email, phone, password, profile_pic } = request.body;

        // Check if email already exists
        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return response.status(400).json({
                message: "User already exists",
                error: true
            });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashpassord = await bcryptjs.hash(password, salt);

        const payload = {
            name,
            email,
            phone,
            password: hashpassord, // Use hashed password here
            profile_pic,
        };

        const user = new UserModel(payload);
        const userSave = await user.save();

        return response.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || "An unexpected error occurred",
            error: true
        });
    }
}

module.exports = registerUser;