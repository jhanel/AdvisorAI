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
  Difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Extremely Hard"],
    required: true
  },
  ExamDate: {
    type: Date
  }
});

module.exports = mongoose.model('Courses', CourseSchema);
