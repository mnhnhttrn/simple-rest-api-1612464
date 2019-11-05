var multer = require('multer');
var passport = require('passport')
var path = require('path')
var userModel = require('../models/user')

const AVATAR_IMAGES_DIR = './public/images/avatar'
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, AVATAR_IMAGES_DIR);
    },
    filename: function (req, file, cb) {
        cb(null, req.user.account_id + path.extname(file.originalname));
    }
})

var upload = multer({ storage });

module.exports = function (app) {
    app.post('/upload-avatar', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        upload.single('avatar')(req, res, err => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }
            userModel.updateProfileByID(req.user.account_id, req.user.account_username, path.join('/images/avatar', req.file.filename)).then(() => {
                return res.status(200).json({
                    message: 'sucessfully updated',
                    profilePayload:{
                        username: req.user.account_username,
                        avatarURL: path.join('/images/avatar', req.file.filename)
                    }
                })
            })
        })
    })
}