import fs from 'fs/promises';
import Papa from 'papaparse';

const inputCSV = 'hot_takes.csv';
const outputJSON = 'hot_takes.jsonl';

const csvData = await fs.readFile(inputCSV, 'utf8');
const { data: rows } = Papa.parse(csvData, {
  header: true,
  skipEmptyLines: true,
});

const jsonData = rows.map((row) => {
  // What's the column name in your CSV file?
  const hotTake = `${row['hot take']}`;
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

await fs.writeFile(outputJSON, jsonData.join('\n'), 'utf8');
console.log(`Dataset converted and saved to ${outputJSON}`);
