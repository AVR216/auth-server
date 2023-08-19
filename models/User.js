const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 }
});


module.exports = model('User', UserSchema);