var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.post('/', function(req, res) {
  //console.log(req.param('body'));
  models.Message.create({
    body: req.param('body')
  }).then(function() {
    res.redirect('/');
  });
});

router.get('/:message_id/destroy', function(req, res) {
  models.Message.find({
    where: {id: req.param('message_id')},
  }).then(function(affectedRows) {
    message.destroy().then(function() {
      res.redirect('/');
    });
  });
});


module.exports = router;
