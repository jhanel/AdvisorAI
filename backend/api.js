// api.js

const mongoose = require('mongoose');

// 1. Define Course Schema (inline)
const examSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  countsAsStudyTime: {
    type: Boolean,
    default: true
  }
});

const courseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  exams: [examSchema]
});

const Course = mongoose.model('Course', courseSchema);

// 2. Export function that attaches routes to `app`
module.exports = function (app) {
  // ✅ Test route
  app.get('/api/test', (req, res) => {
    res.status(200).json({ success: true, message: 'API is working!' });
  });

  // ✅ Add a course
  app.post('/api/addcourse', async (req, res) => {
    try {
      const { userId, courseName } = req.body;

      if (!userId || !courseName) {
        return res.status(400).json({ error: 'Missing userId or courseName' });
      }

      const newCourse = new Course({
        userId,
        courseName,
        exams: []
      });

      await newCourse.save();
      res.status(200).json({ success: true, course: newCourse });
    } catch (err) {
      console.error('Error in /addcourse:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Add an exam to a course
  app.post('/api/addexam', async (req, res) => {
    try {
      const { courseId, title, date, time, countsAsStudyTime } = req.body;

      if (!courseId || !title || !date || !time) {
        return res.status(400).json({ error: 'Missing required exam fields' });
      }

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      course.exams.push({
        title,
        date,
        time,
        countsAsStudyTime: countsAsStudyTime ?? true
      });

      await course.save();
      res.status(200).json({ success: true, course });
    } catch (err) {
      console.error('Error in /addexam:', err);
      res.status(500).json({ error: err.message });
    }
  });

  // ✅ Get all courses for a user
  app.get('/api/getcourses/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const courses = await Course.find({ userId });
      res.status(200).json({ success: true, courses });
    } catch (err) {
      console.error('Error in /getcourses:', err);
      res.status(500).json({ error: err.message });
    }
  });
};
