const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: {type: Number, required: true, unique: true},
    resetPasswordToken: { type: String }, // Added for reset password 
    resetPasswordExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);