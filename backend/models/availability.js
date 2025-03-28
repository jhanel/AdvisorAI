const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}, // Reference to User
  Sunday: [{ start_time: String, end_time: String }],
  Monday: [{ start_time: String, end_time: String }],
  Tuesday: [{ start_time: String, end_time: String }],
  Wednesday: [{ start_time: String, end_time: String }],
  Thursday: [{ start_time: String, end_time: String }],
  Friday: [{ start_time: String, end_time: String }],
  Saturday: [{ start_time: String, end_time: String }]
});

module.exports = mongoose.model('Availability', availabilitySchema);

