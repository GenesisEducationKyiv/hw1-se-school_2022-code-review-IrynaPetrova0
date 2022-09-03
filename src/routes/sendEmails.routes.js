const express = require('express'),
	router = express.Router(),
	SendEmailsController = require('../controllers/sendEmails.controller');

router
	.route('/')
	.post(SendEmailsController.send);

module.exports = router;