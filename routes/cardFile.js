const router = require('koa-router')();
const User = require('../models/User');

router.get('/cardFile', async ctx => {
    const retreiveUsers = {};

    await User.find( (err, users) => {
        if(err) console.error(err);
        retreiveUsers.users =  users;
    });

    await ctx.render('cardFile', { users: retreiveUsers.users });
});

router.get('/cardFile/:id', async ctx => {
    const retreiveUser = {};

    await User.findById(ctx.params.id, async (err, user) => {
        if(err) console.error(err);
        if(!user) {
            console.log('User was not found');
            ctx.status = 404;
        } else{
            retreiveUser.user =  user;
        }
    });

    await ctx.render('profile', { user: retreiveUser.user });
});


module.exports = router;