const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    examname: { type: String, required: true },
    examdate: { type: Date, required: true }
});

module.exports = mongoose.model('Exam', examSchema);