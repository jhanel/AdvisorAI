require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const User = require('./models/user');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Register

app.post('/api/register', async (req, res) => {
    const { firstname, lastname, email, password, userId } = req.body;

    if (!firstname || !lastname || !email || !password || !userId) {
        return res.status(400).json({ error: 'Missing required field(s).' });
    }

    try {
        const emails = await User.findOne({ email: email });
        if (emails) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const newUser = new User({ firstname, lastname, email, password, userId });
        const registerUser = await newUser.save();

        if (registerUser) {
            res.status(201).json({ message: 'User registered successfully' });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email: email });

        if (!userData || userData.password !== password) {
            return res.status(404).json({ error: 'Invalid credentials' });
        }

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

const PORT = process.env.PORT || 5002;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});