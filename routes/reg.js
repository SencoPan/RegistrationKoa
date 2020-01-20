const router = require('koa-router')();
const multer = require('@koa/multer');
const User = require('../models/User');

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
    ctx.render('home');
});
router.get('/reg', async ctx => {
    await ctx.render('registration');
});

router.post('/reg',  upload.single('image'),
    async (ctx, next) => {
        try{
            let emptyFields = [];

            for(let i in ctx.request.body){
                if(ctx.request.body[i] === ''){
                    emptyFields.push("The " + i + " field is empty.")
                }
            }

            if (typeof emptyFields !== 'undefined' && emptyFields.length > 0){
               await ctx.render('registration', {messages: emptyFields});
            } else{
                let newUser = new User();
                newUser.login = ctx.request.body.login;
                newUser.login = ctx.request.body.login;
                newUser.login = ctx.request.body.login;
                newUser.login = ctx.request.body.login;
                newUser.login = ctx.request.body.login;
                ctx.redirect('/');
            }
        } catch(err) {
            console.error(err);
            ctx.body = {
                success: false,
                message: 'This is not image file'
            }
        }

});

module.exports = router;