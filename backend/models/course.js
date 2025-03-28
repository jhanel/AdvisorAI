const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    user: { type: Number, ref: 'User', required: true },
    coursetitle: { type: String, required: true },
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard', 'Extremely Hard'], 
        required: true 
    }
});

module.exports = mongoose.model('Course', courseSchema);