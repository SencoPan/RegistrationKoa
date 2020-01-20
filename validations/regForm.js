const schema = {
    email: {
        notEmpty: true,
        isEmail: {
            errorMessage: 'Invalid Email'
        }
    },
    password: {
        notEmpty: true,
        isLength: {
            options: [{ min: 4 }],
            errorMessage: 'Must be longer than 3 symbols'
        },
        errorMessage: 'Invalid Password' // Error message for the parameter
    },
    login: {
        notEmpty: true,
        isLength: {
            options: [{ min: 3, max: 10 }],
            errorMessage: 'Must be between 3 and 10 chars long'
        },
        errorMessage: 'Login must not be empty'
    },
    specialism: {
        notEmpty: true
    },
    sex: {
        notEmpty: true
    },
    image: {
        notEmpty: true
    }
};

module.exports = schema;