const fs = require('fs');
const file = 'c:\\Users\\kauag\\Documents\\KauaDev\\FACULDADE\\EasyCalc\\easyCalc.worktrees\\agents-calcquest-initial-frontend-structure\\src\\data\\modules.js';
let content = fs.readFileSync(file, 'utf8');
const before = (content.match(/\\,/g) || []).length;
content = content.replace(/\\,/g, '\\;');
fs.writeFileSync(file, content, 'utf8');
console.log('Replaced', before, 'occurrences');
