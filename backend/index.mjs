import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate a study schedule
async function generateStudySchedule(userInput) {
  try {
    // Use the correct Gemini model here, e.g., 'gemini-2' or whichever is correct
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });  // Update with the correct Gemini model

    const prompt = `I need a study schedule in JSON format for a week.
    
    ### Rules:
    - **Each day appears only ONCE** in the JSON output.
    - **Study sessions must strictly follow availability**. Do not schedule outside of available hours.
    - **No duplicate keys** (e.g., "Saturday" should appear only once).
    - **No time overlaps or incorrect formatting**.
    - **Use 24-hour military time format (e.g., "14:00-16:00"). Do not include AM/PM.**

    ### Inputs:
    - Courses: ${JSON.stringify(userInput.courses)}
    - Difficulty (1-4): ${JSON.stringify(userInput.difficulty)}
    - Exams (yes or no): ${JSON.stringify(userInput.exams)}
    - Exam Dates: ${JSON.stringify(userInput.examDates)}
    - Availability: ${JSON.stringify(userInput.availability)}

    ### Output:
    - Return only valid JSON with days and study sessions.
    - No explanations. No additional text.
    `;


    const result = await model.generateContent(prompt);
    const textResponse = result.response.candidates[0].content.parts[0].text;

    // Extract JSON from response
    const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);
    const jsonData = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();

    return JSON.parse(jsonData);

  } catch (error) {
    console.error("Error generating study schedule:", error);
    return { error: "Failed to generate study schedule." };
  }
}

// Example usage:
const userInput = {
  courses: ["Math", "Physics", "History", "Biology"],
  difficulty: { Math: 4, Physics: 5, History:2, Biology: 3},
  exams: { Math: "yes", Physics: "yes", History: "yes", Biology: "no"},
  availability: {
    Monday: [
      { start_time: "09:00", end_time: "11:00" },
      { start_time: "14:00", end_time: "16:00" }
    ],
    Tuesday: [
      { start_time: "10:00", end_time: "12:00" },
      { start_time: "13:00", end_time: "15:00" }
    ],
    Wednesday: [
      { start_time: "09:00", end_time: "10:00" },
      { start_time: "15:00", end_time: "17:00" }
    ],
    Thursday: [
      { start_time: "09:00", end_time: "11:00" },
      { start_time: "14:00", end_time: "18:00" }
    ],
    Friday: [
      { start_time: "11:00", end_time: "13:00" },
      { start_time: "16:00", end_time: "20:00" }
    ]
  }  
};

generateStudySchedule(userInput).then((schedule) => {
  console.log("Generated Study Schedule:", JSON.stringify(schedule, null, 2));
});
