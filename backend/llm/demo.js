// Demo script to test queryPrompt functionality
// Run with: node backend/llm/demo.js

import { processQuery, getQuickMetric } from "./prompts/queryPrompt.js";
import { processProductQuery } from "./prompts/productPrompt.js";
import { processCategoryQuery } from "./prompts/categoryPrompt.js";

async function runDemo() {
  console.log("=== SmartMarket Query Demo ===\n");

  // Quick metrics - pulls straight from data summary without using LLM
  console.log("--- Quick Metrics (no LLM) ---");
  console.log(getQuickMetric("total-waste"));
  console.log(getQuickMetric("avg-waste-percent"));
  console.log(getQuickMetric("top-categories"));

  console.log("\n--- Processing Natural Language Queries ---");
  
  // Example queries for queryPrompt
  const queries = [
    "Why is waste higher this week?"
  ];

  for (const query of queries) {
    console.log(`\nQuery: "${query}"`);
    const response = await processQuery(query);
    console.log(`Response:\n${response}\n`);
  }


  // Example queries for productPrompt
  const productQueries = [
    "Why were so many bananas wasted last month?"
  ];

  for (const query of productQueries) {
    console.log(`\nProduct Query: "${query}"`);
    const response = await processProductQuery(query);
    console.log(`Response:\n${response}\n`);
  }

  //Example queries for categoryPrompt
  const categoryQueries = [
    "How does waste compare between Bakery and Meat categories?"
  ];

  for (const query of categoryQueries) {
    console.log(`\nCategory Query: "${query}"`);
    const response = await processCategoryQuery(query);
    console.log(`Response:\n${response}\n`);
  }

  //Example query for storeInsightsPrompt
  const storeQueries = [
    "Generate insights for store 004"
  ];

  for (const query of storeQueries) {
    console.log(`\nStore Query: "${query}"`);
    const response = await processQuery(query);
    console.log(`Response:\n${response}\n`);
  }

}

runDemo().catch(console.error);
