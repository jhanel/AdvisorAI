const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/course');
const router = express.Router();

// Route to add a new course
router.post('/api/addcourse', async (req, res) => {
  const { userId, courseTitle, difficulty } = req.body;

  if (!userId || !courseTitle || !difficulty) {
    return res.status(400).json({ error: 'Missing required field(s).' });
  }

  const allowedLevels = ["Easy", "Medium", "Hard", "Extremely Hard"];
  if (!allowedLevels.includes(difficulty)) {
    return res.status(400).json({ error: 'Invalid difficulty level.' });
  }

  const newCourse = new Course({
    userId: mongoose.Types.ObjectId(userId),
    courseTitle,
    difficulty
  });

  try {
    await newCourse.save();
    res.status(200).json({ message: `Course "${courseTitle}" added successfully.`, courseId: newCourse._id });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

module.exports = router;