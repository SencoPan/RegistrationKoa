/*
const passport = require("koa-passport");
const User = require('../models/User');
const LocalStrategy = require('passport-local');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, login, password, done) => {


    User.findOne({'login': login}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user){
            return done(null, false, {message: 'Email is already in use'})
        }
        let newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, newUser) => {
            if (err) {
                return done(err);
            }
            done(null, newUser)
        })
    })
}));
*/
