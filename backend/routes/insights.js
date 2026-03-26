// Endpoint for dashboard UI to connect to gemini client
// We'll connect this to the dashboard later so when a user clicks "generate insights," gemini api generates them.

import { runLLM } from "../llm/geminiClient.js";

ReadableStreamDefaultController.post("/", async (req, res) => {
    const storeMetrics = req.body;

    const prompt = storeInsightsPrompt(storeMetrics);
    const insights = await runLLM(prompt);

    res.json({ insights });
});