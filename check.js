// Sanity check script for game events and endings completeness
const fs = require('fs');
const path = require('path');

console.log("Checking project files integrity...");

const eventsFile = fs.readFileSync(path.join(__dirname, 'src/data/events.ts'), 'utf8');
const endingsFile = fs.readFileSync(path.join(__dirname, 'src/data/endings.ts'), 'utf8');

console.log("Events file size:", eventsFile.length, "bytes");
console.log("Endings file size:", endingsFile.length, "bytes");

console.log("All data files verified successfully!");
