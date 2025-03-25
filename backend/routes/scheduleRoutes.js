const express = require('express');
const router = express.Router();
const Schedule = require('../models/schedule');
const User = require('../models/user');
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendMail = require('./tokenSender');
const nodemailer = require('nodemailer');

// Login API
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, userData.password);
        if ( !isMatch) {
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

        // creating a new user
        const newUser = new User({ firstname, lastname, email, password: hashedPassword, emailToken });
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

// Sends email for password reset
router.post('/passwordreset', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required.' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'No user found with that email.' });

        // Generates a reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Expires in 1 hour
        await user.save();

        // Send reset password email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Reset password page
        const resetURL = `http://studentadvisorai.xyz/resetpassword?token=${resetToken}`;

        // Email details
        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset Request',
            text: `Click the link to reset your password: ${resetURL}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Password reset email sent.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing password reset request.' });
    }
});


// Changes the password
router.post('/resetpassword', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) return res.status(400).json({ error: 'Token and new password are required.' });

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ error: 'Invalid or expired token.' });

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error resetting password.' });
    }
});

module.exports = router;