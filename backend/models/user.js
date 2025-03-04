const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userID: {type: Number, required: true, unique: true}
});

const User = mongoose.model('User', userSchema);

models.exports = User;