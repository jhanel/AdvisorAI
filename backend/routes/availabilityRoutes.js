const express = require('express');
const router = express.Router();
const Availability = require('../models/Availability');

// Get availability for a user
router.get('/getavailability/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const userAvailability = await Availability.findOne({ userId });

    if (!userAvailability) {
      return res.status(404).json({ error: 'User availability not found' });
    }

    res.status(200).json({ availability: userAvailability });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update or create availability for a user
router.post('/update-availability', async (req, res) => {
  try {
    const { userId, availability } = req.body;

    if (!userId || !availability) {
      return res.status(400).json({ error: 'userId and availability are required' });
    }

    const updatedAvailability = await Availability.findOneAndUpdate(
      { userId },
      { $set: availability },
      { new: true, upsert: true, runValidators: true } // upsert to create if not found
    );

    return res.json({
      availability: updatedAvailability
    });
  } catch (error) {
    console.error('Error updating availability:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete-availability/:userId/:day', async (req, res) => {
  const { userId, day } = req.params;

  // Check if the day is valid
  const validDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (!validDays.includes(day)) {
    return res.status(400).json({ error: 'Invalid day provided.' });
  }

  try {
    // Find  users availability
    const userAvailability = await Availability.findOne({ userId });

    if (!userAvailability) {
      return res.status(404).json({ error: 'User availability not found.' });
    }

    // Remove availability for the specified day
    userAvailability[day] = [];

    // Save the updated availability
    await userAvailability.save();

    res.status(200).json({
      availability: userAvailability
    });
  } catch (err) {
    console.error('Error deleting availability:', err);
    res.status(500).json({ error: 'Failed to delete availability.' });
  }
});

module.exports = router;