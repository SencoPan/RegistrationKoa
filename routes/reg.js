const router = require('koa-router')();
const multer = require('@koa/multer');
const User = require('../models/User');
const passport = require('koa-passport');

User.createUser = async (user, photo) => {
    const newUser = new User();

    newUser.email = user.email;
    newUser.login = user.login;
    newUser.specialism = user.specialism;
    newUser.sex = user.sex;
    newUser.image = photo;
    newUser.password = newUser.encryptPassword(user.password);

    newUser.save(err => {
        if(err) console.log(err);
    })
};

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    }
});

const upload = multer({storage: storage});

router.get('/test', async ctx => {
    ctx.session.test = "123";
    ctx.render('home');
});
router.get('/reg', async ctx => {
    await ctx.render('registration');
});

router.post('/reg', upload.single('image'), async (ctx) => {
    let emptyFields = [];

    for(let i in ctx.request.body){
        if(ctx.request.body[i] === ''){
            emptyFields.push("The " + i + " field is empty.")
        }
    }

    if (typeof emptyFields !== 'undefined' && emptyFields.length > 0){
        ctx.render('registration', {messages: emptyFields});
        return;
    }

    User.createUser(ctx.request.body, ctx.file.originalname);

    return passport.authenticate('local', (err, user, info, status) => {
            if (user) {
                User.findOne({login: user}, (err, user) => {
                    if (err) console.error(err);
                    ctx.login(user);
                });
                ctx.redirect('/');
            } else {
                console.log(err);
                ctx.status = 400;
                ctx.body = { status: 'error' };
            }
        })(ctx)
        }
    );

/*router.post('/reg', upload.single('image'),
    async (ctx, next) => {
        try{
            console.log('Complete');
        } catch(err) {
            console.error(err);
            ctx.body = {
                success: false,
                message: 'Error'
            }
        }
});*/

module.exports = router;