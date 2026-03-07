module.exports = {
  test_page: 'tests/index.html?hidepassed&nolint&notrycatch',
  disable_watching: true,
  timeout: 1200,
  browser_start_timeout: 2000,
  parallel: 4,
  launch_in_ci: ['Chrome'],
  launch_in_dev: ['Chrome'],
  browser_args: {
    Chrome: {
      dev: [
        '--no-sandbox',
        '--disable-gpu',
        '--auto-open-devtools-for-tabs',
        '--window-size=1440,900',
      ].filter(Boolean),
      ci: [
        '--no-sandbox',
        '--disable-gpu',
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900',
      ].filter(Boolean),
    },
    Firefox: ['-headless'],
  },
};
