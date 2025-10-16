const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('cesar', { title: 'Cifra de César' });
});

module.exports = router;
