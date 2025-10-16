const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, _next) {
  res.render('index', { title: 'Cifra de Vigenère' });
});

module.exports = router;
