const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const User = require('../models/user'); //changed User to user

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

// Register API

router.post('/register', async (req, res) => {
    
    const { firstname, lastname, email, password, userId } = req.body;

    // checks for any missing fields when registering
    if ( !firstname || !lastname || !email || !password || !userId ) // possibly remove userID ?
    {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        // checks if an email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // creating a new user
        const newUser = new User({ firstname, lastname, email, password, userId });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    
    }
    
    // registration failed
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

module.exports = router;