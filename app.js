const Koa = require('koa');
const Pug = require('koa-pug');
const serve = require('koa-static');
const path = require('path');
const logger = require('koa-morgan');
const session = require('koa-generic-session');
const convert = require('koa-convert');
const CSRF = require('koa-csrf');

const mongoose = require('./config/database');
const homeRoute = require('./routes/home');
const regRoute = require('./routes/reg');

const app = new Koa();

// Connection to Mongoose
mongoose.connect();

app.keys = ['someunseenkey', 'anothersomeunseenkey'];

app.use(convert(session()));
app.use(logger('dev'));


// Error-middleware handler
app.use(async(ctx, next) => {
    try {
        await next();
        const status = ctx.status || 404;
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        ctx.status = err.status || 500;
        pug.locals.status = ctx.status;
        if (ctx.status === 404) {
            //Your 404.jade
            await ctx.render('404error', pug.locals)
        } else {
            //other_error jade
            await ctx.render('index', pug.locals)
        }
    }
});

app.use(new CSRF({
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
}));

app.use(serve(`${__dirname}/public`));

const pug = new Pug({
    viewPath: path.resolve(__dirname, './views'),
    locals: { },
    app: app
});

app.use(homeRoute.routes());
app.use(regRoute.routes());

app.listen(3000, function(){
    console.log('Server running on https://localhost:3000')
});