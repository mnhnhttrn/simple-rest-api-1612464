var express = require('express');
var passport = require('passport')
var router = express.Router();

/* GET users listing. */
router.get('/', passport.authenticate('jwt',{session:false}), function(req, res, next) {
  res.json({
    message:"successfully logged",
    info: req.user
  });
});

module.exports = router;
