import { execSync, spawn } from 'child_process';
import { cpSync, rmSync } from 'fs';
import { join } from 'path';

const PORT = 8080;

console.log('Installing playwright browsers...');
execSync('pnpm exec playwright install', { stdio: 'inherit' });

console.log('\nBuilding production app...');
execSync('ember build --environment=production', { stdio: 'inherit' });

console.log(`\nStarting http-server on port ${PORT}...`);
const server = spawn('http-server', ['-p', String(PORT), '--silent'], {
  cwd: join(process.cwd(), 'dist'),
  stdio: 'ignore',
});

// Wait for server to be ready
await new Promise((resolve) => setTimeout(resolve, 2000));

try {
  console.log('\nRunning prerender...');
  execSync('pnpm prerender', { stdio: 'inherit' });

  console.log('\nMoving prerendered content to dist...');
  const prerenderDir = join(process.cwd(), 'prerender');
  const distDir = join(process.cwd(), 'dist');

  cpSync(prerenderDir, distDir, { recursive: true });
  rmSync(prerenderDir, { recursive: true, force: true });

  console.log('\nBuild complete!');
} finally {
  console.log('\nShutting down server...');
  server.kill();
}
