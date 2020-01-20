const Router = require('koa-router');
const mongoDB = require('../config/database');
const router = new Router();

router.get('/', async ctx => {
    await ctx.render('home');
});

router.get('/check',async ctx => {
    if(ctx.isAuthenticated()){
        await ctx.render('404error');
    } else {
        await ctx.render('index');
    }
});

module.exports = router;