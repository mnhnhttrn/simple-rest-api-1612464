var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var passportJWT = require("passport-jwt");
var UserModel = require('../models/user')
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
var config = require('../config')
var bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, cb) {
        return UserModel.findOne(username)
            .then(users => {
                if (!users.length){
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                const user = users[0]
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                if (user.account_password != password){
                    return cb(null, false, { message: 'Incorrect email or password.' });    
                }
                const ret = {
                    id: user.account_id, 
                    username: user.account_username,
                    avatarURL: user.account_avatar
                }
                return cb(null, ret, { message: 'Logged In Successfully' });
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
},
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return UserModel.findOneByID(jwtPayload.id)
            .then(users => {
                if (!users.length){
                    return cb(null, false);
                }
                if (!users[0]){
                    return cb(null, false);
                }
                const user = users[0]
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));