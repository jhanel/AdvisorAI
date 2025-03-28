import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
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

const Schedule = mongoose.model('Schedule', scheduleSchema);
export default Schedule;
