require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const scheduleRoutes = require('./routes/scheduleRoutes');
const courseRoutes = require('./routes/courseRoutes');
const examRoutes = require('./routes/examRoutes.js');
const availabilityRoutes = require('./routes/availabilityRoutes'); 
const studySchedule = require('./routes/studyScheduleRoutes'); 

app.use('/api/schedule', scheduleRoutes);
app.use('/api', courseRoutes);
app.use('/api', examRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/studySchedule', studySchedule);


const PORT = process.env.PORT || 5002;

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.listen(5002, '0.0.0.0'); 
