const express = require('express');
const router = express.Router();
const Course = require('../models/courses.js');


// Add a course
router.post('/addcourse', async (req, res) => {
  const { userID, coursetitle, difficulty } = req.body;

  if (!userID || !coursetitle || !difficulty) {
      return res.status(400).json({ error: 'Missing required field(s).' });
  }

  try {
      const newCourse = new Course({
          user: userID,
          coursetitle,
          difficulty
      });

      const savedCourse = await newCourse.save();

      res.status(200).json({
          message: 'Course added successfully.',
          courseID: savedCourse._id.toString(),
          course: savedCourse
      });
  } catch (err) {
      console.error('Error adding course:', err);
      res.status(500).json({ error: 'Failed to add course.' });
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