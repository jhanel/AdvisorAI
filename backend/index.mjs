/*import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// How to run:
// 1.switch to backend folder
// 2. run node index.mjs

// Load environment variables from .env file
dotenv.config();

// Create GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate a study schedule
async function generateStudySchedule(userInput) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    //Prompt for AI
    const prompt = `Generate a JSON-formatted weekly study schedule.

### **Rules**
- **Each day must appear only ONCE.**
- **Only schedule study sessions within the given availability.**
- **Use start_time and end_time format like in the input.**
- **No time overlaps. No exceeding availability slots.**
- **More study time for harder subjects. Less for easier subjects.**
- **Format times in 24-hour military format (e.g., "14:00-16:00").**

### **Inputs**
- Courses: ${JSON.stringify(userInput.courses)}
- Difficulty: ${JSON.stringify(userInput.difficulty)}
- Exams: ${JSON.stringify(userInput.exams)}
- Exam Dates: ${JSON.stringify(userInput.examDates)}
- Availability: ${JSON.stringify(userInput.availability)}

### **Output**
- Return **ONLY** valid JSON. No extra text or explanations.
- The JSON format must be:
\`\`\`json
{
  "Monday": [
    { "start_time": "09:00", "end_time": "11:00", "course": "Math" },
    { "start_time": "14:00", "end_time": "16:00", "course": "Physics" }
  ],
  "Tuesday": [...],
  ...
}
\`\`\`
`;

    const result = await model.generateContent(prompt);
    const textResponse = result.response.candidates[0].content.parts[0].text;

    // Extract JSON from AI response
    const jsonMatch = textResponse.match(/```json([\s\S]*?)```/);
    const jsonData = jsonMatch ? jsonMatch[1].trim() : textResponse.trim();

    return JSON.parse(jsonData);
  } 
  catch (error) {
    console.error("Error generating study schedule:", error);
    return { error: "Failed to generate study schedule." };
  }
}

// Function makes sure that schedule is within availbilty and has no duplicates
function validateSchedule(schedule, availability) {
  let validatedSchedule = {};

  for (const [day, sessions] of Object.entries(schedule)) {
    if (!availability[day]) continue; // Skip days with no availability

    validatedSchedule[day] = sessions.filter(session => {
      return availability[day].some(avail => {
        return (
          session.start_time >= avail.start_time &&
          session.end_time <= avail.end_time
        );
      });
    });
  }

  return validatedSchedule;
}

// User Input example
const userInput = {
  courses: ["Math", "Physics", "History", "Biology"],
  difficulty: { Math: "hard", Physics: "extremely hard", History: "easy", Biology: "medium" },
  exams: { Math: "yes", Physics: "yes", History: "yes", Biology: "no" },
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
  const validatedSchedule = validateSchedule(schedule, userInput.availability);
  console.log("Final Study Schedule:", JSON.stringify(validatedSchedule, null, 2));
});


*/

