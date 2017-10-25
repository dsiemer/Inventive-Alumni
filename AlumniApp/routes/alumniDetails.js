var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('alumniDetails', { title: 'Alumni Details' });
});

module.exports = router;
