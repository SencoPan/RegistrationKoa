const router = require('koa-router')();
const multer = require('@koa/multer');
const mongoDB = require('../config/database');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    }
});

const upload = multer({storage: storage});

router.get('/reg', async ctx => {
    await ctx.render('registration');
});

router.post('/reg',
    async (ctx, next) => {
        try{
            console.dir(ctx.request);
        } catch(err) {
            console.error(err);
            ctx.body = {
                success: false,
                message: 'This is not image file'
            }
        }
}, upload.single('image'));

module.exports = router;