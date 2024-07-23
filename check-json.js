const fs = require('fs');
const path = require('path');

const reportDir = 'cypress/reports/mocha';
const files = fs.readdirSync(reportDir);

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(reportDir, file);
    const data = fs.readFileSync(filePath, 'utf8');
    try {
      JSON.parse(data);
      console.log(`${file} is valid JSON`);
    } catch (err) {
      console.error(`${file} is invalid JSON: ${err.message}`);
    }
  }
});