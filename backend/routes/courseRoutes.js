const Course = require('../models/course.js');

exports.setApp = function (app) {

  // Add Course API
  app.post('/api/addcourse', async (req, res) => {
    const { userId, courseTitle, difficulty, examDate } = req.body;

    // Validate required fields
    if (!userId || !courseTitle || !difficulty) {
      return res.status(400).json({ error: 'Missing required field(s).' });
    }

    // Validate difficulty
    const allowedLevels = ["Easy", "Medium", "Hard", "Extremely Hard"];
    if (!allowedLevels.includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Must be one of: Easy, Medium, Hard, Extremely Hard.'
      });
    }

    // Create new course
    const newCourse = new Course({
      UserId: userId,
      CourseTitle: courseTitle,
      Difficulty: difficulty,
      ExamDate: examDate ? new Date(examDate) : null
    });

    try {
      await newCourse.save();
      res.status(200).json({ message: `Course ${courseTitle} added successfully!` });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });

  // Delete Course
  app.delete('/api/deletecourse', async (req, res) => {
    const { userId, courseTitle } = req.body;

    // Validate input
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

};
