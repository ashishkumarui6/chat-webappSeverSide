async function logout(request, response) {
    try {

        const cookieOptions = {
            httpOnly: false, // Makes the cookie inaccessible via client-side scripts
            secure: true    // Ensures the cookie is sent only over HTTPS
        };

        return response.cookie("token", "", cookieOptions).status(200).json({
            message: "session out",
            success: true
        })
    }
    catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

module.exports = logout