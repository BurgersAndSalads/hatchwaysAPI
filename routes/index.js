var express = require('express');
var router = express.Router();
const apiCtrl = require('../controllers/api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hatchwaysAPI assessment' });
});

// api requirement 1, ping for success message
router.get('/api/ping', apiCtrl.ping);

// api requirement 2, get posts and sort them
router.get('/api/posts', apiCtrl.posts);

module.exports = router;
