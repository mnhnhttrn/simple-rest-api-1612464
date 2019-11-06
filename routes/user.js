const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/user')
const JWT_SECRET = require('../config').JWT_SECRET

// POST register
router.post('/register', function (req, res, next) {
    //console.log(req.body)
    let info = req.body
    //console.log(req.body.username)
    if (info.username === "" || info.password === "") {
        res.status(400).json({
            message: "Username or Password is invalid"
        })
    }
    if (!info.avatarURL) {
        info.avatarURL = ""
    }
    userModel.findOne(info.username).then(users => {
        if (users.length) {
            res.status(400).json({
                message: "Username exists"
            })
        }
        userModel.createAccount(info.username, info.password, info.avatarURL).then(uid => {
            userModel.findOneByID(uid).then(users => {
                if (users.length) {
                    const user = {
                        id: users[0].account_id,
                        username: users[0].account_username,
                        avatarURL: users[0].account_avatar
                    }
                    req.login(user, { session: false }, (err) => {
                        if (err) {
                            res.send(err);
                        }
                        // generate a signed son web token with the contents of user object and return it in the response
                        const token = jwt.sign(user, JWT_SECRET);
                        return res.status(200).json({
                            message: "successfully created",
                            token
                        });
                    });
                } else {
                    return res.status(500).json({
                        message: "there is a problem while creating account"
                    })
                }
            })
        }).catch(err => {
            res.status(503).json({
                message: "there is a problem while create the account",
                err: err
            })
        })
    })
});
/* POST login. */
router.post('/login', function (req, res, next) {
    //console.log(req.body)
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.status(400).json({
                    message: info
                });
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, JWT_SECRET);
            return res.status(200).json({
                message: "successfully logged",
                token
            });
        });
    })(req, res);
});

router.post('/social', function(req,res,next){
    if(req.body.type && req.body.type === 'facebook' || req.body.type === 'google'){
        const user = {
            type: req.body.type,
            id: req.body.id,
            username: req.body.username,
            avatarURL: req.body.avatarURL
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, JWT_SECRET);
            console.log(token)
            return res.status(200).json({
                message: "successfully created",
                token
            });
        });
    } else {
        res.status(400).json({
            message: 'xác thực thất bại!'
        });
    }
})


module.exports = router;