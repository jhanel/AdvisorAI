import express from 'express';
import Availability from '../models/availability.js';

const router = express.Router();

// Update Availability for a User
router.post('/update-availability', async (req, res) => {
  try {
    const { userId, availability } = req.body;
    await Availability.findOneAndUpdate({ userId }, availability, { new: true });
    res.json({ message: 'Availability updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
