// Test page for Gemini AI
// Use: node index.mjs to run the code

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a GoogleGenerativeAI instance
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Function to generate content using Gemini API
async function generateContent() {
  try {
    // Call the API to generate content (replace with the actual model name)
    const model = genAI.getGenerativeModel({  model: "gemini-2.0-flash" });  // Replace with available model
    const prompt = "Explain how AI works in a few words";
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

  } catch (error) {
    console.error('Error generating content:', error);
  }
}

// Run the function
generateContent();
