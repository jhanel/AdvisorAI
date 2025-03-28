const express = require('express');
const router = express.Router();
const Course = require('../models/course');

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

// Delete a course
router.delete('/deletecourse/:courseId', async (req, res) => {
    const { courseId } = req.params;

    if (!courseId) {
        return res.status(400).json({ error: 'Missing course ID.' });
    }

    try {
        const deleted = await Course.findByIdAndDelete(courseId);

        if (!deleted) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        res.status(200).json({ message: 'Course deleted successfully.' });
    } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ error: 'Failed to delete course.' });
    }
});

module.exports = router;