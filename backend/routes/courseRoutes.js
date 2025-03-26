const express = require('express');
const router = express.Router();
const Course = require('../models/courses.js');

  // Add Course API
  router.post('/addcourse', async (req, res) => {
    const { userId, courseTitle, difficulty, examDate } = req.body;
  
    if (!userId || !courseTitle || !difficulty) {
      return res.status(400).json({ error: 'Missing required field(s).' });
    }
  
    const allowedLevels = ["Easy", "Medium", "Hard", "Extremely Hard"];
    if (!allowedLevels.includes(difficulty)) {
      return res.status(400).json({ error: 'Invalid difficulty level.' });
    }
  
    const newCourse = new Course({
      UserId: userId,
      CourseTitle: courseTitle,
      Difficulty: difficulty,
      ExamDate: examDate ? new Date(examDate) : null
    });
  
    try {
      await newCourse.save();
      return res.status(200).json({ message: `Course ${courseTitle} added successfully!` });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  });

  // Delete Course
  router.delete('/deletecourse', async (req, res) => {
    const { userId, courseTitle } = req.body;
  
    if (!userId || !courseTitle) {
      return res.status(400).json({ error: 'Missing userId or courseTitle.' });
    }
  
    try {
      const result = await Course.deleteOne({ UserId: userId, CourseTitle: courseTitle });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      return res.status(200).json({ message: `Course ${courseTitle} deleted.` });
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  });

  module.exports = router;