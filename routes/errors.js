const router = require('koa-router')();

router.get('/404', async ctx => {
    await ctx.render('404error', {status: ctx.status, message: ctx.message});
});

module.exports = router;