var models = require('../models')
var path = require('path');
var express = require('express');
var router = express.Router();


// route middleware that will happen on every request
router.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log(req.params)
  next();
});

router.get('/', function(req, res) {
  models.Message.findAll().then(function(messages) {
    res.render('index', {
      title: 'Express',
      messages: messages
    });
  });
});

module.exports = router;
