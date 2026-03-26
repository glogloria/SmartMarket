import { loadCSV } from "./data/loadCSV.js";

const data = await loadCSV("./data/perishable_goods_management.csv");
console.log(data.slice(0,3));