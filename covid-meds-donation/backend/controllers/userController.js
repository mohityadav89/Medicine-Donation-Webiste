const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

// Register a user
exports.registerUser = async (req, res, next) => {
    try {
        const { name, phoneNo, email, password } = req.body;

        if (!name || !phoneNo || !email || !password) {
            return res.status(404).json("All fields are required")
        }

        const user = await User.create({
            name,
            phoneNo,
            email,
            password
        })

        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
    }
}

// Login User
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Checks if email and password is entered by user
        if (!email || !password) {
            return res.status(404).json("Please enter email and password")
        }

        // Finding user in database
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return res.status(404).json("Invalid Email or Password")
        }

        // Checks if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return res.status(404).json("Invalid Email or Password")
        }

        sendToken(user, 200, res)
    } catch (error) {
        console.log(error)
    }
}

// Get currently logged in user details
exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
}

// Logout user
exports.logout = async (req, res, next) => {
    try {
        res.cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            message: 'Logged out'
        })
    } catch (error) {
        console.log(error)
    }
}