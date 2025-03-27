const express = require('express');
const mongoose = require('mongoose');
const Exam = require('../models/exam');
const Course = require('../models/course');
const router = express.Router();

// Route to add a new exam
router.post('/api/addexam', async (req, res) => {
  const { userId, courseId, examName, examDate } = req.body;

  if (!userId || !courseId || !examName || !examDate) {
    return res.status(400).json({ error: 'Missing required field(s).' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course || course.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized or invalid course.' });
    }

    const newExam = new Exam({
      userId: mongoose.Types.ObjectId(userId),
      courseId: mongoose.Types.ObjectId(courseId),
      examName,
      examDate
    });

    await newExam.save();
    res.status(200).json({ message: `Exam "${examName}" added successfully.`, examId: newExam._id });

  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

module.exports = router;