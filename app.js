const Koa = require('koa');
const Pug = require('koa-pug');
const serve = require('koa-static');
const path = require('path');
const logger = require('koa-morgan');
const MongooseStore = require('koa-session-mongoose');
const session = require('koa-session');

const mongoose = require('./config/database');

const homeRoute = require('./routes/home');
const regRoute = require('./routes/reg');
const errRoute = require('./routes/errors');

const app = new Koa();

// Connection to Mongoose
mongoose.connect();

app.keys = ['someunseenkey', 'anothersomeunseenkey'];

app.use(session({ store: new MongooseStore() }, app));
app.use(logger('dev'));

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
app.use(errRoute.routes());

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});