// SCHEMA ( MongoDB model )

const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema
({
    userId: String,
    schedule: Array     // stores study sessions
});

module.exports = mongoose.model('Schedule', ScheduleSchema);