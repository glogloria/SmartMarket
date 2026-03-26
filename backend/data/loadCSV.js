import fs from "fs";
import csv from "csv-parser";

export function loadCSV(path) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(path)
            .pipe(csv())
            .on("data", (row) => {
                results.push(row);
            })
            .on("end", () => {
                resolve(results);
            })
            .on("error", (err) => {
                reject(err);
            });
    });
}