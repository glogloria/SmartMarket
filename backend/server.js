import { loadCSV } from "./data/loadCSV.js";

let groceryData = [];

async function init() {
    groceryData = await loadCSV("./data/grocery.csv");
    console.log("CSV loaded:", groceryData.length, "rows");
}

init();