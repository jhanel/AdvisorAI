const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');

router.post('/addexam', async (req, res) => {
    const { userID, courseID, examname, examdate } = req.body;

    if (!userID || !courseID || !examname || !examdate) {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        // check for dupes
        const existingExam = await Exam.findOne({
            user: userID,
            course: courseID,
            examname: { $regex: new RegExp('^' + examname + '$', 'i') }
        });

        if (existingExam) {
            return res.status(409).json({ error: 'Duplicate: Exam already exists.' });
        }

        const newExam = new Exam({
            user: userID,
            course: courseID,
            examname,
            examdate
        });

        const savedExam = await newExam.save();

        res.status(200).json({
            message: 'Exam added successfully.',
            examID: savedExam._id.toString(),
            exam: savedExam
        });
    } catch (err) {
        console.error('Error adding exam:', err);
        res.status(500).json({ error: 'Failed to add exam.' });
    }
});

// Delete exam
router.delete('/deleteexam', async (req, res) => {
    const { userID, courseID, examname, examdate } = req.body;

    if (!userID || !courseID || !examname) {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        const query = {
            user: userID,
            course: courseID,
            examname: { $regex: new RegExp('^' + examname + '$', 'i') } // exact but case-insensitive
        };

        if (examdate) {
            query.examdate = examdate;
        }

        const deletedExam = await Exam.findOneAndDelete(query);

        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found.' });
        }

        res.status(200).json({ message: 'Exam deleted successfully.' });
    } catch (err) {
        console.error('Error deleting exam:', err);
        res.status(500).json({ error: 'Failed to delete exam.' });
    }
});

// Get exam ID
router.get('/getexamid/:userID', async (req, res) => {
    const { userID } = req.params;
    const { courseID } = req.query;

    if (!userID) {
        return res.status(400).json({ error: 'Missing user ID.' });
    }

    try {
        const filter = { user: userID };
        if (courseID) {
            filter.course = courseID;
        }

        const exams = await Exam.find(filter, '_id examname examdate course');

        if (!exams.length) {
            return res.status(404).json({ error: 'No exams found for this user.' });
        }

        res.status(200).json(exams);
    } catch (err) {
        console.error('Error fetching exams:', err);
        res.status(500).json({ error: 'Failed to fetch exam IDs.' });
    }
});

module.exports = router;