const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');

// Add a new exam
router.post('/addexam', async (req, res) => {
    const { userID, courseID, examname, examdate } = req.body;

    if (!userID || !courseID || !examname || !examdate) {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        // check for dupes exam
        const existingExam = await Exam.findOne({
            user: userID,
            course: courseID,
            examname: { $regex: new RegExp('^' + examname + '$', 'i') },
            examdate
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
            message: 'Exam added successfully!',
            examID: savedExam._id.toString(),
            exam: savedExam
        });
    } catch (err) {
        console.error('Error adding exam:', err);
        res.status(500).json({ error: 'Failed to add exam.' });
    }
});

// Delete an exam
router.delete('/deleteexam', async (req, res) => {
    const { userID, courseID, examname, examdate } = req.body;

    if (!userID || !courseID || !examname) {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        const query = {
            user: userID,
            course: courseID,
            examname: { $regex: new RegExp('^' + examname + '$', 'i') } // exact name but case-insensitive
        };

        if (examdate) {
            query.examdate = examdate;
        }

        const deletedExam = await Exam.findOneAndDelete(query);

        if (!deletedExam) {
            return res.status(404).json({ error: 'Exam not found.' });
        }

        res.status(200).json({ message: 'Exam deleted successfully!' });
    } catch (err) {
        console.error('Error deleting exam:', err);
        res.status(500).json({ error: 'Failed to delete exam.' });
    }
});

// Edit an exam
router.patch('/editexam/:examId', async (req, res) => {
    const { examId } = req.params;
    const { examname, examdate } = req.body;

    if (!examname && !examdate) {
        return res.status(400).json({ error: 'Nothing to update.' });
    }

    try {
        const updateFields = {};
        if (examname) updateFields.examname = examname;
        if (examdate) updateFields.examdate = examdate;

        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedExam) {
            return res.status(404).json({ error: 'Exam not found.' });
        }

        res.status(200).json({
            message: 'Exam updated successfully!',
            exam: updatedExam
        });
    } catch (err) {
        console.error('Error editing exam:', err);
        res.status(500).json({ error: 'Failed to update exam.' });
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
            return res.status(404).json({ error: 'No exams found.' });
        }

        res.status(200).json(exams);
    } catch (err) {
        console.error('Error fetching exams:', err);
        res.status(500).json({ error: 'Failed to fetch exam IDs.' });
    }
});

module.exports = router;