const express = require('express');
const router = express.Router();
const { register, login, getUserDetails } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/user', protect, getUserDetails); // Add this route to get user details

module.exports = router;
