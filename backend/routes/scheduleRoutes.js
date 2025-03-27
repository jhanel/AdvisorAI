const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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
    
    const { firstname, lastname, email, password} = req.body;

    // checks for any missing fields when registering
    if ( !firstname || !lastname || !email || !password)
    {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        // checks if an email is already in use
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // hashing the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // generating the email token and user ID
        const emailToken = crypto.randomBytes(64).toString("hex");
        const userId = Math.floor(100000 + Math.random() * 900000);

        // creating a new user
        const newUser = new User({ firstname, lastname, email, password: hashedPassword, userId, emailToken });
        await newUser.save();

        // calling the sendMail function to send the email and email token
        await sendMail(email, emailToken);
        res.status(201).json({ message: 'User registered successfully' });
    
    }
    
    // registration failed
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }

});

// Verify Email API

router.patch("/verifyemail", async (req, res) => {
    const { emailToken } = req.body;
  
    if (!emailToken) {
      return res.status(400).json({ status: "Failed", error: "empty request" });
    }
  
    let user = await User.findOne({ where: { emailToken } });
  
    if (!user) {
      return res.status(404).json({ status: "Failed", error: "User not found" });
    }
  
    await User.update(
      { isVerifiedEmail: true, emailToken: null },
      { where: { emailToken } }
    );
  
    return res.status(200).json({ status: "Success", message: "User verified successfully" });
  });

module.exports = router;