require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//i changed this:
const url = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected!"))
    .catch(err => console.error("MongoDB Connection Error:", err));

const scheduleRoutes = require('./routes/scheduleRoutes');
app.use('/api/schedule', scheduleRoutes);

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