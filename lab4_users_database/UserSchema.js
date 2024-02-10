const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: 4, // length must have length >= 4
    },
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, // allow only valid email address
    },
    address: {  // nested object
        street: {
            type: String,
            required: true,
        },
        suite: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
            match: /^[a-zA-Z\s]*$/, // allow only alphabets and spaces
        },
        zipcode: {
            type: String,
            required: true,
            // zipcode must be be like 12345-1234 (DDDDD-DDDD, D = digit)
            match: /^[0-9]{5}-[0-9]{4}$/,
        },
        geo: {  // nested object
            lat: {
                type: String,
                required: true,
            },
            lng: {
                type: String,
                required: true,
            },
        },
    },
    phone: {
        type: String,
        required: true,
        // validate phone number like 1-123-123-1234 (D-DDD-DDD-DDD, D = digit)
        validate: {
            validator: (v) => {
                return /^[0-9]{1}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(v);
            },
            message: 'Phone number must be in 1-123-123-1234 format'
        },
        
    },
    website: {
        type: String,
        required: true,
        // allow only valid website address (http or https is valid)
        match: /^(http|https):\/\/[^ "]+$/,
    },
    company: {  // nested object
        name: {
            type: String,
            required: true,
        },
        catchPhrase: {
            type: String,
            required: true,
        },
        bs: {
            type: String,
            required: true,
        },
    }
});

UserSchema.pre('save', (next) => { // pre-save hook
    UserModel.find({username: this.username}, (err, document) => {
        if (document.length == 0) {
            return next();
        }
    next(new Error('Username already exists'));
        return false;
    });
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;