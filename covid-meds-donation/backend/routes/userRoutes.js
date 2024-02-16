const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    logout,
} = require('../controllers/userController');

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile)
router.route('/logout').post(logout);

module.exports = router;