/*const express = require('express');
const router = express.Router();
const Course = require('../models/courses');

// Route: POST /api/addcourse
// add a new course
router.post('/addcourse', async (req, res) => {
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

// Route: POST /api/addexam
// add an exam to a course
router.post('/addexam', async (req, res) => {
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

// Route: GET /api/getcourses/:userId
// get all courses for a user
router.get('/getcourses/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const courses = await Course.find({ userId });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error('Error in /getcourses:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;*/