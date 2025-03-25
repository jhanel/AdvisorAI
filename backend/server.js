const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Mongo DB connected"))
  .catch(err => console.log(err));

const api = require('./api.js');
api.setApp(app);

app.listen(port, () => console.log(`Server running on port ${port}`));