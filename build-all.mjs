import { execSync } from 'child_process';
import { cpSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

console.log('--- Starting unified build process ---');

// 0. Generate Produce & Applications Guide PDF
console.log('\n[0/3] Generating Applications Guide PDF...');
execSync('node scripts/generate-applications-pdf.mjs', { stdio: 'inherit' });

// 1. Build Desktop App
console.log('\n[1/3] Building Desktop App...');
execSync('npm run build', { stdio: 'inherit' });

// 2. Build Mobile App
console.log('\n[2/3] Building Mobile App...');
execSync('npm install && npm run build', { cwd: './mobile', stdio: 'inherit' });

// 3. Copy Mobile Build to Desktop dist/mobile
console.log('\n[3/3] Merging Mobile build into Desktop dist folder...');
const mobileDist = join(process.cwd(), 'mobile', 'dist');
const targetMobileDir = join(process.cwd(), 'dist', 'mobile');

if (existsSync(mobileDist)) {
  if (existsSync(targetMobileDir)) {
    rmSync(targetMobileDir, { recursive: true, force: true });
  }
  cpSync(mobileDist, targetMobileDir, { recursive: true });
  console.log('✅ Successfully copied mobile build to dist/mobile');
} else {
  console.error('❌ Failed to find mobile dist directory!');
  process.exit(1);
}

console.log('\n--- Build process completed successfully! ---');
