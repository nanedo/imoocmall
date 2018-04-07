var express = require('express');
var router = express.Router();

// http://forbeslindesay.github.io/express-route-tester/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index.html', function(req, res, next){
  res.redirect('/')
})

module.exports = router;
