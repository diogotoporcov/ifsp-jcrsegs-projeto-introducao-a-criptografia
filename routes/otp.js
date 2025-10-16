const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('otp', { title: 'One Time Pad (OTP)' });
});

module.exports = router;
