const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email:{type: String, required: true, unique: true, trim: true, minLength: 5, maxLength: 255},
        firstName:{type: String, required: true, trim: true, minLength: 1, maxLength: 50},
        lastName:{type: String, required: true, trim: true, minLength: 1, maxLength: 50},
        password:{type: String, required: true, regex: '^[a-zA-Z0-9._-]{4,16}$'},
        isAdmin:{type: Boolean, default: false},
        isLocked:{type: Boolean, default: false},
        havePasswordUpdated:{type: Boolean, default: false}
    }
);

userSchema.path('firstName').validate(function (v) {return v.length < 50;},'The maximum length of first name is 50');
userSchema.path('lastName').validate(function (v) {return v.length < 50;},'The maximum length of last name is 50');

const User = mongoose.model('User',userSchema);
module.exports = User;
