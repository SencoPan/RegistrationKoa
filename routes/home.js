const Router = require('koa-router');
const mongoDB = require('../config/database');
const router = new Router();

router.get('/', async ctx => {
    await ctx.render('home');
});

module.exports = router;