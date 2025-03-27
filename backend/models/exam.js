const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the Course model
    required: true
  },
  examName: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Exam', ExamSchema);