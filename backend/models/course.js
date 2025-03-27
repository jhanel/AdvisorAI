const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  courseTitle: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard", "Extremely Hard"],
    required: true
  }
});

module.exports = mongoose.model('Course', CourseSchema);