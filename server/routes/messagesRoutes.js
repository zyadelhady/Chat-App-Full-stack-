const express = require('express');
const messagesController = require('../controllers/messagesController');

const router = express.Router();

const { getAllMessages } = messagesController;

router.route('/').post(getAllMessages);

module.exports = router;
