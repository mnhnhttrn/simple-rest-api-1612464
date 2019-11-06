var express = require('express');
var passport = require('passport')
var router = express.Router();
var userModel = require('../models/user')

/* GET users listing. */
router.get('/', passport.authenticate('jwt',{session:false}), function(req, res, next) {
  console.log('get profile user', req.user)
  if(req.user.type === 'facebook'){
    return res.status(200).json({
      message:'successfully logged',
      profilePayload: req.user  
    })
  }
  const profile = {
    username: req.user.account_username,
    avatarURL: req.user.account_avatar ? req.user.account_avatar : "" 
  }
  //console.log('get profile payload', profile)
  return res.status(200).json({
    message:"successfully logged",
    profilePayload: profile
  });
});

// Update profile
router.post('/', passport.authenticate('jwt',{session:false}), function(req,res,next) {
  const uid = req.user.account_id 
  const {username} = req.body
  userModel.findOne(username).then(users =>{
    if (users.length){
      if (users[0] && users[0].account_id !== id){
        return res.status(400).json({
          message:"tên tài khoản đã tồn tại"
        })
      }
    } else {
      userModel.updateProfileByID(uid, username, req.user.account_avatar ? req.user.account_avatar : "").then(()=>{
        return res.status(200).json({
          message:"thông tin tài khoản đã được cập nhật thành công"
        })
      })
    }
  })
})

// update passowrd
router.post('/change-password', passport.authenticate('jwt',{session:false}), function(req,res,next){
  const uid = req.user.account_id
  const {oldPassword, newPassword} = req.body
  if (req.user.account_password === oldPassword){
    userModel.updatePasswordByID(uid, newPassword).then(()=>{
        return res.status(200).json({
          message:"password successfully updated"
        })
    })
  } else {
    return res.status(400).json({
      message:"wrong old password"
    })
  }
})

module.exports = router;
