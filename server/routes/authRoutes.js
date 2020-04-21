const express = require('express');
const authController = require('../controllers/authController');

const userController = require('../controllers/userController');

const router = express.Router();

const { signup, signin, logout, protect } = authController;

const { getMe, getUser } = userController;

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/logout').get(logout);

router.use(protect);

router.route('/me').get(getMe, getUser);

router.route('/:id').get(getUser);

module.exports = router;
