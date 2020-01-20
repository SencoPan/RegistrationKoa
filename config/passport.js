const User = require('../models/User');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const options = {passReqToCallback: true};

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true
}, (res, username, password, done) =>{
    User.find({login: username}, (err, user) => {
        return done(null, username);
        /*

        let newUser = new User();

        newUser.login = req.request.body.login;
        newUser.email = req.request.body.email;
        newUser.specialism = req.request.body.specialism;
        newUser.sex = req.request.body.sex;
        newUser.image = "../public/uploads/" + req.request.body.login;

        newUser.save((err, newUser) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            done(null, newUser)
        });*/
    });
    return done(null, username);
    /*let emptyFields = [];

    for(let i in req.request.body){
        if(req.request.body[i] === ''){
            emptyFields.push("The " + i + " field is empty.")
        }
    }

    if (typeof emptyFields !== 'undefined' && emptyFields.length > 0){
        req.render('registration', {messages: emptyFields});
        done(null);
    } else{
        User.findOne({'login': login}, (err, user) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (user) {
                return done(null, false, {message: 'Login is already in use'})
            }

            let newUser = new User();

            newUser.login = req.request.body.login;
            newUser.email = req.request.body.email;
            newUser.specialism = req.request.body.specialism;
            newUser.sex = req.request.body.sex;
            newUser.image = "../public/uploads/" + req.request.body.login;

            newUser.save((err, newUser) => {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                done(null, newUser)
            });
        })
    }*/
}));

/*passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username, password, username);
    done(null, true)
}));*/
