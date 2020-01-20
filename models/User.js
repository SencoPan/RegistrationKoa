const db = require('mongoose');
const Schema = db.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    login: {type: String, required: true, unique: true},
    specialism: {type: String, required: true},
    sex: {type: String, required: true},
    image: {type: String, required: true},
    password: {type: String, required: true}
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = db.model('User', userSchema);