const router = require('koa-router')();

router.get('/404', async ctx => {
    await ctx.render('404error');
});

module.exports = router;