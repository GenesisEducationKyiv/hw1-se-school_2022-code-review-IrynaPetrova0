const express = require('express'),
	router = express.Router(),
	RateController = require('../controllers/rate.controller');

router
	.route('/')
	.get(RateController.getRate);

module.exports = router;