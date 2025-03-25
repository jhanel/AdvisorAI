// load required modules
const mongoose = require('mongoose');
const Course = require('./models/course.js');  
const token = require('./createJWT.js');

exports.setApp = function (app) {

  app.post('/api/addcourse', async (req, res, next) => {
    // incoming: userId, courseTitle, courseCode, difficulty, examDate, jwtToken
    // outgoing: error, jwtToken

    const { userId, courseTitle, courseCode, difficulty, examDate, jwtToken } = req.body;

    try {
      if (token.isExpired(jwtToken)) {
        var r = { error: 'The JWT is no longer valid', jwtToken: '' };
        res.status(200).json(r);
        return;
      }
    } catch (e) {
      console.log(e.message);
    }

    const newCourse = new Course({
      UserId: userId,
      CourseTitle: courseTitle,
      CourseCode: courseCode,
      Difficulty: difficulty,
      ExamDate: examDate
    });

    var error = '';

    try {
      await newCourse.save();
    } catch (e) {
      error = e.toString();
    }

    var refreshedToken = null;
    try {
      refreshedToken = token.refresh(jwtToken);
    } catch (e) {
      console.log(e.message);
    }

    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
};
