const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { exit } = require('process');

router.post('/register', async (req, res) => {
    const { firstname, lastname,  email, password, userID } = req.body;

    try {
        const newUser = new User({ firstname, lastname, email, password, userID });
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

app.post('/check-email', async (req, res)  => {
    const { email } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      res.json({ exists: !!existingUser });
      // checks if the email is already in use
      if (existingUser) {
        res.status(409).json({ message: 'Email already in use' });
        // bring user back to registration page
      }
    } 
    catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;