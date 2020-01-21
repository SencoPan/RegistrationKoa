const Koa = require('koa');
const Pug = require('koa-pug');
const serve = require('koa-static');
const path = require('path');
const logger = require('koa-morgan');
const passport = require('koa-passport');
const session = require('koa-session2');

const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/registration');


const homeRoute = require('./routes/home');
const regRoute = require('./routes/reg');
const cardRoute = require('./routes/cardFile');
const errRoute = require('./routes/errors');

const app = new Koa();

// Connection to Mongoose
mongoose.connect("mongodb://localhost:27017/registration", { useNewUrlParser: true, useUnifiedTopology: true });

app.keys = ['someunseenkey'];

app.use(session({
    key: "SESSIONID",
    maxAge: 300000//default "koa:sess"
}));
app.use(logger('dev'));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    locals: { },
    app: app
});

// Error-middleware handler
app.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.redirect('/404')
        }
    } catch (err) {
        console.log(err);
    }
});

app.use(serve(`${__dirname}/public`));

app.use(homeRoute.routes());
app.use(regRoute.routes());
app.use(cardRoute.routes());
app.use(errRoute.routes());

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});