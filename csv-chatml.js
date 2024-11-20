// Import required modules
import fs from 'fs/promises';
import Papa from 'papaparse';

// Define input CSV and output CSV file paths
const inputCSV = 'hot_takes.csv';
const outputCSV = 'hot_takes_chatml.csv';

// Read the CSV file
const csvData = await fs.readFile(inputCSV, 'utf8');

// Parse the CSV data into rows
const { data: rows } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

// Convert rows into ChatML format suitable for fine-tuning
const csvRows = rows.map((row) => {
  const hotTake = `${row['hot take']}`;
  return {
    chatml: `<|im_start|>system\nYou are a hot take generator.\n<|im_end|>\n<|im_start|>user\nGive me a hot take.\n<|im_end|>\n<|im_start|>assistant\n${hotTake}\n<|im_end|>`
  };
});

// Convert the rows back into CSV format
const csvContent = Papa.unparse(csvRows);

// Write the CSV data to the output file
await fs.writeFile(outputCSV, csvContent, 'utf8');

// Log a message indicating the conversion is complete
console.log(`Dataset converted and saved to ${outputCSV}`);
