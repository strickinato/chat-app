path = require('path');
express = require('express');
var router = express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

router.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

module.exports = router;
