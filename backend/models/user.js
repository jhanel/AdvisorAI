const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerifiedEmail: { type: Boolean, default: false },
    emailToken: { type: String, default: null },
    resetPasswordToken: { type: String }, 
    resetPasswordExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);