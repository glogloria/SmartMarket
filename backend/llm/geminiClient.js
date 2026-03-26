// Loads API key and initializes Gemini client

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

console.log("Loaded key:", process.env.GEMINI_API_KEY);

// Call function to run prompts
export async function runLLM(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text();
  
}