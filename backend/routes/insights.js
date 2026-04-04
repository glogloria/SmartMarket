// Endpoint for dashboard UI to connect to gemini client
// We'll connect this to the dashboard later so when a user clicks "generate insights," gemini api generates them.

import { runLLM } from "../llm/geminiClient.js";

// Import all prompt modules
import { processCategoryQuery } from "../llm/prompts/categoryPrompt.js";
import { processProductQuery } from "../llm/prompts/productPrompt.js";
import { processQuery } from "../llm/prompts/queryPrompt.js";
import { processStoreQuery } from "../llm/prompts/storeInsightsPrompt.js";

ReadableStreamDefaultController.post("/", async (req, res) => {
    const { type, query, storeMetrics } = req.body;

    let prompt;
    let insights;

    try {
        switch (type) {
            case "store":
                prompt = processStoreQuery(storeMetrics);
                insights = await runLLM(prompt);
                break;
            case "category":
                insights = await processCategoryQuery(query || "Generate insights for categories");
                break;
            case "product":
                insights = await processProductQuery(query || "Generate insights for products");
                break;
            case "general":
            default:
                insights = await processQuery(query || "Generate general insights");
                break;
        }

        res.json({ insights });
    } catch (error) {
        console.error("Error generating insights:", error);
        res.status(500).json({ error: "Failed to generate insights" });
    }
});