const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userModel = require('../models/user')
const JWT_SECRET = require('../config').JWT_SECRET

// POST register
router.post('/register', function (req, res, next) {
    console.log(req.body)
    const info = req.body
    console.log(req.body.Username)
    if (info.Username === "" || info.Password === "") {
        res.status(400).json({
            message: "Username or Password is invalid"
        })
    }
    userModel.findOne(info.Username).then(users => {
        if (users.length) {
            res.status(400).json({
                message: "Username exists"
            })
        }
        userModel.createAccount(info.Username, info.Password).then(ret => {
            res.json({
                message: "Successfully created",
                accountID: ret
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
    console.log(req.body)
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, JWT_SECRET);
            return res.json({
                message: "successfully logged", 
                token
            });
        });
    })(req, res);
});

module.exports = router;