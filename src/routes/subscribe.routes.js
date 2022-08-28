const express = require('express'),
	router = express.Router(),
	SubscribeController = require('../controllers/subscribe.controller');

router
	.route('/')
	.post(SubscribeController.addNewEmail);

module.exports = router;