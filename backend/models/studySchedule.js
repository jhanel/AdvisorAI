const mongoose = require('mongoose');

const studyScheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  generatedSchedule: {
    Sunday: [{ start_time: String, end_time: String, course: String }],
    Monday: [{ start_time: String, end_time: String, course: String }],
    Tuesday: [{ start_time: String, end_time: String, course: String }],
    Wednesday: [{ start_time: String, end_time: String, course: String }],
    Thursday: [{ start_time: String, end_time: String, course: String }],
    Friday: [{ start_time: String, end_time: String, course: String }],
    Saturday: [{ start_time: String, end_time: String, course: String }]
  }
});

module.exports = mongoose.model('StudySchedule', studyScheduleSchema);