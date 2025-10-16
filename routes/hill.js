const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('hill', { title: 'Cifra de Hill' });
});

module.exports = router;
