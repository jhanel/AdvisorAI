const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');

// Register API

router.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, userId } = req.body;

    if ( !firstname || !lastname || !email || !password || !userId ) 
    {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        // check if email is already in use
        const emails = await User.find({ email });
        if (emails) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // creating a new user
        const newUser = new User({ firstname, lastname, email, password, userId });
        const registerUser = await newUser.save();
        if (registerUser) {
            res.status(201).json({ message: 'User registered successfully' });
        }
    }
    
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
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