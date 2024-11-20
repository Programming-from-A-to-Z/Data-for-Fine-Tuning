import fs from 'fs/promises';
import Papa from 'papaparse';

// Define input CSV and output JSONL file paths
const inputCSV = 'hot_takes.csv';
const outputJSON = 'hot_takes.jsonl';

// Read the CSV file
const csvData = await fs.readFile(inputCSV, 'utf8');

// Parse the CSV data into rows
const { data: rows } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

// Convert rows into JSONL format
const jsonData = rows.map((row) => {
  // Extract the hot take from the CSV row
  const hotTake = `${row['hot take']}`;

  // Format the conversation for fine-tuning
  return JSON.stringify({
    messages: [
      {
        role: 'system',
        content: 'You are a hot take generator.',
      },
      { role: 'user', content: 'Give me a hot take.' },
      { role: 'assistant', content: hotTake },
    ],
  });
});

// Write the JSONL data to the output file
await fs.writeFile(outputJSON, jsonData.join('\n'), 'utf8');

// Log a message indicating the conversion is complete
console.log(`Dataset converted and saved to ${outputJSON}`);