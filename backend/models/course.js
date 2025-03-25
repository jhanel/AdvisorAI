const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  UserId: {
    type: Number,
    required: true
  },
  CourseTitle: {
    type: String,
    required: true
  },
  CourseCode: {
    type: String,
    required: true
  },
  Difficulty: {
    type: Number, // 1-5
    required: true
  },
  ExamDate: {
    type: Date,
    required: false
  }
});

module.exports = Course = mongoose.model('Courses', CourseSchema);