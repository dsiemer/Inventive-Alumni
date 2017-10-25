var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('alumni-details', { title: 'Alumni Details' });
});

module.exports = router;
