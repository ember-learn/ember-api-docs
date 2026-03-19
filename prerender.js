const { chromium } = require('playwright');
const { mkdirSync, writeFileSync } = require('fs');
const { dirname, join } = require('path');
const getPremberUrls = require('./prember-urls');

const BASE_URL = 'http://127.0.0.1:8080';
const PRERENDER_DIR = 'prerender';

async function prerenderPage(page, url) {
  try {
    // Use router transition
    await page.evaluate((path) => {
      window.__router?.transitionTo(path);
    }, url);

    await page.waitForFunction(() => {
      return (
        window.__router &&
        !window.__router.currentRouteName?.includes('loading')
      );
    });

    // Check if we got a 404 by looking for common error indicators
    const is404 = await page.evaluate(() => {
      return document.title.includes('Page Not Found');
    });

    if (is404) {
      return { url, status: 'not-found' };
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

    return { url, status: 'success' };
  } catch (error) {
    return { url, status: 'error', error: error.message };
  }
}

async function initializePage(browser) {
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

  return page;
}

async function prerenderVersion(urls) {
  const browser = await chromium.launch();
  const CONCURRENCY = 5; // Number of parallel pages

  // Initialize multiple pages
  const pages = await Promise.all(
    Array.from({ length: CONCURRENCY }, () => initializePage(browser)),
  );

  let successCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;
  let urlIndex = 0;

  // Process URLs in parallel using a worker pool pattern
  const workers = pages.map(async (page) => {
    while (urlIndex < urls.length) {
      const currentIndex = urlIndex++;
      const url = urls[currentIndex];

      const result = await prerenderPage(page, url);

      if (result.status === 'success') {
        successCount++;
      } else if (result.status === 'not-found') {
        console.log(`Not Found: ${url}`);
        notFoundCount++;
      } else {
        console.error(`Error processing ${url}:`, result.error);
        errorCount++;
      }

      if ((currentIndex + 1) % 100 === 0) {
        console.log(
          `Progress: ${currentIndex + 1}/${urls.length} (${successCount} saved, ${notFoundCount} not found, ${errorCount} errors)`,
        );
      }
    }
  });

  await Promise.all(workers);
  await browser.close();
}
async function prerender() {
  const urlsByVersion = getPremberUrls();
  const totalUrls = Array.from(urlsByVersion.values()).reduce(
    (sum, urls) => sum + urls.length,
    0,
  );

  console.log(
    `Prerendering ${totalUrls} URLs across ${urlsByVersion.size} versions...`,
  );

  for (const [, urls] of urlsByVersion.entries()) {
    await prerenderVersion(urls);
  }

  console.log('\nPrerendering complete!');
  console.log(`Total URLs: ${totalUrls}`);
}

prerender().catch((error) => {
  console.error('Prerendering failed:', error);
  // eslint-disable-next-line n/no-process-exit
  process.exit(1);
});
