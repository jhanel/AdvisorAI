const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user.js');
const Availability = require('../models/Availability.js');
const StudySchedule = require('../models/studySchedule.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: './.env' });


// Initialize Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate study schedule using AI
async function generateStudySchedule(userData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert user data into a structured AI prompt
    const prompt = `Generate a JSON-formatted weekly study schedule.

    ### **Rules**
    - **Each day must appear only ONCE.**
    - **Only schedule study sessions within the given availability.**
    - **More study time for harder subjects.**
    - **Format times in 24-hour military format (e.g., "14:00-16:00").**

    ### **User Data**
    - Courses: ${JSON.stringify(userData.courses)}
    - Difficulty: ${JSON.stringify(userData.difficulty)}
    - Exam Dates: ${JSON.stringify(userData.exams)}
    - Availability: ${JSON.stringify(userData.availability)}

    ### **Output Format**
    Return only JSON:
    \`\`\`json
    {
      "Sunday": [{"start_time": "10:00", "end_time": "12:00", "course": "Math"}],
      "Monday": [...],
      ...
    }
    \`\`\`
    `;

    // Request AI model to generate a response
    const result = await model.generateContent(prompt);
    const textResponse = result.response.candidates[0].content.parts[0].text;

    // Extract JSON from AI response
    const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);
    const jsonData = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();

    return JSON.parse(jsonData);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "Failed to generate study schedule." };
  }
}

// Route to get AI-generated study schedule
router.post('/generate-schedule', async (req, res) => {
  try {
    const { userId } = req.body;

    // Fetch user data from MongoDB
    const user = await User.findById(userId).populate('courses').populate('availabilityId');
    if (!user) return res.status(404).json({ error: "User not found" });

    // Format user data for AI input
    const userData = {
      courses: user.courses.map(course => course.courseTitle),
      difficulty: Object.fromEntries(user.courses.map(course => [course.courseTitle, course.difficulty])),
      exams: Object.fromEntries(user.courses.map(course => [course.courseTitle, course.examDate ? "yes" : "no"])),
      availability: user.availabilityId
    };

    // Generate study schedule using AI
    const generatedSchedule = await generateStudySchedule(userData);

    // Store generated schedule in MongoDB
    const newSchedule = new Schedule({ userId, generatedSchedule });
    await newSchedule.save();

    res.status(201).json({ message: "Study schedule generated successfully", schedule: newSchedule });
  } catch (error) {
    console.error("Error generating schedule:", error);
    res.status(500).json({ error: "Failed to generate study schedule." });
  }
});

module.exports = router;
