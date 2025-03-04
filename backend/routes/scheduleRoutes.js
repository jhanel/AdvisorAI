const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// Register

router.post('/register', async (req, res) => {
    const { firstname, lastname, username, password, email } = req.body;

    try {
        const newUser = new User({ firstname, lastname, username, password, email });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    }
    // if email in use in database
    // message: 'Email already in use'
    // don't register with this email
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
    // should also check if person is already registered
});

// Search API

router.post('/search', async (req, res) => {
    try
    {
        const { userId } = req.body;
        if ( !userId ) return res.status(400).json({ error: 'User ID is required.' });

        const schedules = await Schedule.find({ userId });

        if( schedules.length == 0 )
        {
            return res.status(404).json({ message: 'No schedule found.' });
        }

        res.status(200).json({ schedules });
    } catch ( error )
    {
        res.status(500).json({ error: 'Error retrieving schedule.' });
    }
});

module.exports = router;

// Edit API

router.post('/edit', async (req, res) => 
{
    try
    {
        const { userId, scheduleId, newSchedule } = req.body;

        if ( !userId || !scheduleId || !newSchedule )
        {
            return res.status(400).json({ error: 'Missing required field(s).' });
        }

        const updatedSchedule = await Schedule.findOneAndUpdate(
            { _id: scheduleId, userId },    // match scheduleId & userId
            { $set: { schedule: newSchedule } },
            { new: true }
        );

        if( !updatedSchedule )
        {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        res.status(200).json({ error: 'Schedule updated successfully!', updatedSchedule });

    } catch ( error ) 
    {
        res.status(500).json({ error: 'Error updating schedule.' });
    }

});

module.exports = router;