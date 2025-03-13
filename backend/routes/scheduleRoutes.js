const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const User = require('../models/User');
const User = require('../models/User');

//Creates cookie for session
router.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  }));


// Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

        if (userData.password !== password) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

        // If the password matches, return user info
        const { userID, firstname, lastname } = userData;

        res.status(200).json({
            id: userID,
            firstname: firstname,
            lastname: lastname,
            error: ''
        });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Log out API
router.post('/logout', async(req, res) =>{
    req.session.destroy((err) => {
        if (err) {
          return res.status(500).send({ message: 'Logout failed' });
        }
        res.status(200).send({ message: 'Logout successful' });
      });
});

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

// Password reset API
router.post('/passwordreset', async (req, res) => {
    try
    {
        const { email } = req.body;
        if ( !email ) return res.status(400).json({ error: 'Email is required.' });

        const user = await User.find({ email });

        if( user.length == 0 )
        {
            return res.status(404).json({ message: 'No email found.' });
        }

        const updatedPassword = await user.findOneAndUpdate(
            { email: email },    // match scheduleId & userId
            { $set: { schedule: newSchedule } },
            { new: true }
        );

        res.status(200).json({ user });
    } catch ( error )
    {
        res.status(500).json({ error: 'Error retrieving schedule.' });
    }
});

module.exports = router;