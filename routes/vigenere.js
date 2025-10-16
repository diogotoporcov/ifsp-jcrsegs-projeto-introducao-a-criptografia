const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('vigenere', { title: 'Cifra de Vigenère' });
});

module.exports = router;
