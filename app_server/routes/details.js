var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('details', { title: 'Vehicle Details' });
});

module.exports = router;
