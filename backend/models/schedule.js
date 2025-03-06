// SCHEMA ( MongoDB model )

const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema
({
    userId: Number,
    schedule: Array     // stores study sessions
});

module.exports = mongoose.model('Schedule', ScheduleSchema);