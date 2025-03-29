const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    coursetitle: { type: String, required: true },
    difficulty: { 
        type: String, 
        enum: ['Easy', 'Medium', 'Hard', 'Extremely Hard'], 
        required: true 
    }
});

module.exports = mongoose.model('Course', courseSchema);