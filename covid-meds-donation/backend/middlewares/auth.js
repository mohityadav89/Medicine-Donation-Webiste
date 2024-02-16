const User = require('../models/userModel')

const jwt = require("jsonwebtoken");

// Checks if user is authenticated or not
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies

        if (!token) {
            return next('Login first to access this resource')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id);

        next()
    } catch (error) {
        next(error)
    }
}

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json(`Role (${req.user.role}) is not allowed to acccess this resource`)
        }
        next()
    }
}