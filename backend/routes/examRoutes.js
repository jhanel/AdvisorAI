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

// Delete an exam
router.delete('/deleteexam/:examId', async (req, res) => {
    const { examId } = req.params;

    if (!examId) {
        return res.status(400).json({ error: 'Missing exam ID.' });
    }

    try {
        const deleted = await Exam.findByIdAndDelete(examId);

        if (!deleted) {
            return res.status(404).json({ error: 'Exam not found.' });
        }

        res.status(200).json({ message: 'Exam deleted successfully.' });
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
            message: 'Exam updated successfully.',
            exam: updatedExam
        });
    } catch (err) {
        console.error('Error editing exam:', err);
        res.status(500).json({ error: 'Failed to update exam.' });
    }
});

module.exports = router;