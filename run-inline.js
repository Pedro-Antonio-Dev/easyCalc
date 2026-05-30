const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = 'c:\\Users\\kauag\\Documents\\KauaDev\\FACULDADE\\EasyCalc\\easyCalc.worktrees\\agents-calcquest-initial-frontend-structure';

console.log('📦 Installing npm packages...');
try {
  execSync('npm install katex react-katex', { 
    cwd: projectRoot,
    stdio: 'inherit'
  });
  console.log('✅ Packages installed successfully');
} catch (error) {
  console.error('❌ Failed to install packages:', error.message);
}

console.log('\n📁 Creating directory structure...');
const directories = [
  'src/styles',
  'src/data',
  'src/components/Header',
  'src/components/ModuleCard',
  'src/components/ProgressBar',
  'src/components/Footer',
  'src/components/MathExpression',
  'src/pages/Home',
  'src/pages/Module'
];

let createdCount = 0;
directories.forEach(dir => {
  const fullPath = path.join(projectRoot, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created: ${dir}`);
    createdCount++;
  } else {
    console.log(`ℹ️  Already exists: ${dir}`);
  }
});

console.log(`\n✨ Done! Created ${createdCount} directories.`);
