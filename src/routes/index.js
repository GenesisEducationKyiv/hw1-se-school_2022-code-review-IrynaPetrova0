const express = require('express');
const router = express.Router();
const rate = require('./rate.routes');
const subscribe = require('./subscribe.routes');
const sendEmails = require('./sendEmails.routes');

router.use('/rate', rate);
router.use('/subscribe', subscribe);
router.use('/sendEmails', sendEmails);

module.exports = router;