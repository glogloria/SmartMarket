// Demo script to test queryPrompt functionality
// Run with: node backend/llm/demo.js

import { processQuery, getQuickMetric } from "./prompts/queryPrompt.js";

async function runDemo() {
  console.log("=== SmartMarket Query Demo ===\n");

  // Quick metrics - pulls straight from data summary without using LLM
  console.log("--- Quick Metrics (no LLM) ---");
  console.log(getQuickMetric("total-waste"));
  console.log(getQuickMetric("avg-waste-percent"));
  console.log(getQuickMetric("top-categories"));

  console.log("\n--- Processing Natural Language Queries ---");
  
  // Example queries
  const queries = [
    "Why is waste higher this week?",
    "Which product category has the most waste?",
    "What's the relationship between storage temperature and spoilage?"
  ];

  for (const query of queries) {
    console.log(`\nQuery: "${query}"`);
    const response = await processQuery(query);
    console.log(`Response:\n${response}\n`);
  }
}

runDemo().catch(console.error);
