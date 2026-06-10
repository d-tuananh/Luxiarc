import fs from 'node:fs';
import path from 'node:path';

const cacheDir = path.join(process.cwd(), '.api-cache');

if (fs.existsSync(cacheDir)) {
  console.log('[Clean Cache] Removing .api-cache folder...');
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('[Clean Cache] Cache cleared successfully.');
  } catch (err) {
    console.error('[Clean Cache] Error clearing cache folder:', err.message);
  }
} else {
  console.log('[Clean Cache] No .api-cache folder found. Starting fresh.');
}
