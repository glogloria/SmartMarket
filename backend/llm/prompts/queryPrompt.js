// Natural-language queries can go here
// AKA when a user asks a question and the LLM converts it into a command the system understands

// Not 100% sure how this would work but imagine someone asks "Why is waste higher this week" vs the typical "how much of [product] was wasted?"
// The LLM would have to search through the dataset and come up with an answer vs pulling metrics directly from the database.

import fs from "fs";
import { runLLM } from "../geminiClient.js";

// CSV parser
function parseCSV(content) {
  const lines = content.trim().split("\n");
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim());
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });
    if (Object.values(row).some(v => v)) data.push(row); // Skip empty rows
  }

  return data;
}

// Load CSV data
let wasteData = [];

function loadData() {
  try {
    const wasteFile = fs.readFileSync("./data/perishable_goods_management.csv", "utf-8");
    wasteData = parseCSV(wasteFile);

    console.log(`✓ Loaded ${wasteData.length} waste records`);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Get data summary for context
function getDataSummary() {
  const totalRecords = wasteData.length;
  const totalWaste = wasteData.reduce((sum, record) => sum + parseFloat(record.units_wasted || 0), 0);
  const avgWastePercent = (wasteData.reduce((sum, record) => sum + parseFloat(record.waste_pct || 0), 0) / totalRecords).toFixed(2);
  
  const categories = [...new Set(wasteData.map(r => r.category))];
  const topWasteCategories = Array.from(new Set(wasteData.map(r => r.category)))
    .map(cat => ({
      category: cat,
      waste: wasteData
        .filter(r => r.category === cat)
        .reduce((sum, r) => sum + parseFloat(r.units_wasted || 0), 0)
    }))
    .sort((a, b) => b.waste - a.waste)
    .slice(0, 3);

  return {
    totalRecords,
    totalWaste: totalWaste.toFixed(2),
    avgWastePercent,
    categories: categories.length,
    topWasteCategories
  };
}

// Format data for LLM context
function formatDataContext() {
  const summary = getDataSummary();
  
  return `
## Inventory & Waste Data Summary
- Total Records: ${summary.totalRecords}
- Total Units Wasted: ${summary.totalWaste}
- Average Waste Percentage: ${summary.avgWastePercent}%
- Product Categories: ${summary.categories}

## Top Waste Categories:
${summary.topWasteCategories.map(c => `- ${c.category}: ${c.waste.toFixed(0)} units wasted`).join("\n")}

## Data Fields Available:
- Perishable Goods: product_name, category, units_wasted, waste_pct, spoilage_risk, storage_temp, shelf_life_days, profit, revenue
  `;
}

// Process natural language query
export async function processQuery(userQuestion) {
  console.log(`\n Processing query: "${userQuestion}"`);

  const systemPrompt = `You are an expert retail analytics assistant for a grocery/market inventory system.
You have access to:
1. Perishable goods waste and spoilage data

${formatDataContext()}

Your job is to:
- Answer analytical questions about waste, spoilage patterns, and inventory trends
- Provide data-driven insights and recommendations
- Differentiate simple metric queries from complex analytical questions
- Format responses clearly with key findings and recommendations

When answering questions:
1. If it's a simple metric query (e.g., "total waste"), provide a direct answer
2. If it's analytical (e.g., "why is waste higher?"), analyze patterns and provide insights
3. Always cite relevant data points from the dataset
4. Suggest actionable recommendations when appropriate`;

  const fullPrompt = `${systemPrompt}\n\nUser Question: ${userQuestion}\n\nProvide a concise, data-driven response.`;

  try {
    const response = await runLLM(fullPrompt);
    console.log("✓ Query processed");
    return response;
  } catch (error) {
    console.error("Error processing query:", error);
    return "Unable to process query. Please try again.";
  }
}

// Simple metric query - used for quick metrics in demo.js
export function getQuickMetric(metricType) {
  const summary = getDataSummary();
  
  const metrics = {
    "total-waste": `Total units wasted: ${summary.totalWaste}`,
    "avg-waste-percent": `Average waste percentage: ${summary.avgWastePercent}%`,
    "waste-summary": JSON.stringify(summary, null, 2),
    "top-categories": summary.topWasteCategories.map(c => `${c.category}: ${c.waste.toFixed(0)} units`).join(", ")
  };

  return metrics[metricType] || "Unknown metric";
}

// Initialize on import
loadData();
