const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user.js');
const Availability = require('../models/Availability.js');
const StudySchedule = require('../models/studySchedule.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Exam = require('../models/exam'); 
require('dotenv').config({ path: './.env' });

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate study schedule using AI
async function generateStudySchedule(userData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a weekly study schedule in JSON format.

      ### Rules:
      - Each day must appear only ONCE.
      - Schedule study sessions ONLY within the user's availability.
      - Allocate **more time for subjects with an exam in the current week**.
      - **More study time should be allocated to harder subjects and subjects with upcoming exams**.
      - Times should be in **24-hour format** (e.g., "14:00-16:00").
      - Ensure that there are **study sessions for each available day**.
      - **Prioritize subjects with exams earlier in the week**. Allocate more time for these subjects at the beginning of the week.
      - For subjects with an exam within the next 7 days, allocate additional study time earlier in the week, before the exam.

      ### User Data:
      - Courses: ${JSON.stringify(userData.courses)}
      - Availability: ${JSON.stringify(userData.availability)}

      ### Output Format (JSON):
      \`\`\`json
      {
        "Sunday": [{"start_time": "11:00", "end_time": "13:00", "course": "Math"}],
        "Monday": [{"start_time": "14:00", "end_time": "16:00", "course": "Science"}],
        ...
      }
      \`\`\`
      `;

    // Generate response based on prompt
    const result = await model.generateContent(prompt);
    const textResponse = result.response.candidates[0].content.parts[0].text;

    try {
      const jsonStart = textResponse.indexOf('{');
      const jsonEnd = textResponse.lastIndexOf('}');
      const jsonData = textResponse.slice(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error("JSON Parsing Error:", error);
      return { error: "Invalid JSON format from AI." };
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "Failed to generate study schedule." };
  }
}


// Function to fetch courses, availability, and exam data for a user
async function getUserData(userId) {
  try {
    const courses = await Course.find({ user: userId });

    const exams = await Exam.find({ user: userId });

    const availabilityDoc = await Availability.findOne({ userId: userId });

    if (!availabilityDoc) {
      console.log("No availability data found!");
      return { courses: [], availability: [], exams: [] };
    }

    // Convert availability to a more usable format
    const availabilityObj = availabilityDoc.toObject();
    const availability = Object.keys(availabilityObj)
      .filter(day => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].includes(day))
      .flatMap(day => 
        availabilityObj[day].map(slot => ({
          day,
          start_time: slot.start_time,
          end_time: slot.end_time
        }))
      );

    // Add daysUntilExam to course info to be sent to the AI
    const coursesWithExamData = courses.map(course => {
      const exam = exams.find(exam => exam.course.toString() === course._id.toString());
      const daysUntilExam = exam ? Math.ceil((new Date(exam.examdate) - new Date()) / (1000 * 3600 * 24)) : null;

      return {
        ...course.toObject(),
        daysUntilExam
      };
    });

    return {
      courses: coursesWithExamData,
      availability,
      exams
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Route to generate or update the study schedule
router.post('/generate-schedule', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Fetch user data
    const userData = await getUserData(userId);

    if (!userData) {
      return res.status(404).json({ error: "User data not found" });
    }

    const generatedSchedule = await generateStudySchedule(userData);

    if (!generatedSchedule || Object.keys(generatedSchedule).length === 0) {
      return res.status(500).json({ error: "AI failed to generate a valid study schedule." });
    }

    let existingSchedule = await StudySchedule.findOne({ userId });

    if (existingSchedule) {
      existingSchedule.generatedSchedule = generatedSchedule;
      await existingSchedule.save();
      return res.status(200).json({ message: "Study schedule updated successfully", schedule: existingSchedule });
    } else {
      const newSchedule = new StudySchedule({ userId, generatedSchedule });
      await newSchedule.save();
      return res.status(201).json({ message: "Study schedule generated successfully", schedule: newSchedule });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to generate study schedule." });
  }
});

module.exports = router;
