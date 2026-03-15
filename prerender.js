const { chromium } = require('playwright');
const { mkdirSync, writeFileSync } = require('fs');
const { dirname, join } = require('path');
const getPremberUrls = require('./prember-urls');

const BASE_URL = 'http://127.0.0.1:8080';
const PRERENDER_DIR = 'prerender';

async function prerenderVersion(urls) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.addInitScript(() => {
    window.__isPrerendering = true;
  });

  // First navigation: full page load
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  await page.waitForFunction(() => {
    const app = window.__emberApiDocs;
    if (!app) return false;
    // Check that the router is in a stable state (no active transitions)
    const router = app.lookup('service:router');
    window.__router = router;
    return router && !router.currentRouteName?.includes('loading');
  });

  let successCount = 0;
  let notFoundCount = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    try {
      // Subsequent URLs: use router transition
      await page.evaluate((path) => {
        return window.__router?.transitionTo(path);
      }, url);

      // Wait for network to be idle after transition
      await page.waitForLoadState('networkidle');

      // Check if we got a 404 by looking for common error indicators
      const is404 = await page.evaluate(() => {
        return document.title.includes('Page Not Found');
      });

      if (is404) {
        console.log(`Not Found: ${url}`);
        notFoundCount++;
        continue;
      }

      // Get the HTML content
      const html = await page.content();

      // Convert URL to file path
      // e.g., /ember/release/classes/ApplicationInstance -> prerender/ember/release/classes/ApplicationInstance/index.html
      const filePath = join(PRERENDER_DIR, url, 'index.html');
      const dir = dirname(filePath);

      // Create directory structure
      mkdirSync(dir, { recursive: true });

      // Write HTML file
      writeFileSync(filePath, html, 'utf-8');

      successCount++;
      if ((i + 1) % 100 === 0) {
        console.log(
          `Progress: ${i + 1}/${urls.length} (${successCount} saved, ${notFoundCount} not found)`,
        );
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, error.message);
    }
  }

  await browser.close();
}
async function prerender() {
  const urlsByVersion = getPremberUrls();
  const totalUrls = Array.from(urlsByVersion.values()).reduce(
    (sum, urls) => sum + urls.length,
    0,
  );

  console.log(`Prerendering ${totalUrls} URLs...`);

  for (const [version, urls] of urlsByVersion.entries()) {
    await prerenderVersion(urls);
  }

  console.log('\nPrerendering complete!');
  console.log(`Total URLs: ${totalUrls}`);
}

prerender().catch((error) => {
  console.error('Prerendering failed:', error);
  process.exit(1);
});
