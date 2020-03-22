const userName = process.env['BROWSERSTACK_USERNAME']
const accessKey = process.env['BROWSERSTACK_ACCESS_KEY']

const canConnectToBrowserStack =  (
  userName && userName.trim().length !== 0
  &&
  accessKey && accessKey.trim().length !== 0
);

let allBrowsers = [
  'Chrome', 'Firefox', 'BS_Safari_Current', 'BS_Safari_Last', 'BS_MS_Edge', 'BS_IE_11'
];
let localBrowsers = ['Chrome'];
let ciBrowsers = canConnectToBrowserStack ? allBrowsers : localBrowsers;

module.exports = {
  'test_page': 'tests/index.html?hidepassed&notrycatch',
  'disable_watching': true,
  timeout: 1200,
  browser_start_timeout: 2000,
  parallel: 4,
  'launch_in_ci': ciBrowsers,
  'launch_in_dev': localBrowsers,
  'browser_args': {
    'Chrome': {
      dev: [
        '--no-sandbox',
        '--disable-gpu',
        '--auto-open-devtools-for-tabs',
        '--window-size=1440,900'
      ],
      ci: [
        '--no-sandbox',
        '--disable-gpu',
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ]
    },
    'Firefox': [
      '-headless'
    ]
  },
  launchers: {
    BS_Safari_Current: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'OS X',
        '--osv',
        'High Sierra',
        '--b',
        'Safari',
        '--bv',
        'latest',
        '-t',
        '1200',
        '--u',
        '<url>'
      ],
      protocol: 'browser'
    },
    BS_Safari_Last: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'OS X',
        '--osv',
        'Sierra',
        '--b',
        'safari',
        '--bv',
        '10.1',
        '-t',
        '1200',
        '--u',
        '<url>'
      ],
      protocol: 'browser'
    },
    BS_MS_Edge: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'Windows',
        '--osv',
        '10',
        '--b',
        'edge',
        '--bv',
        'latest',
        '-t',
        '1200',
        '--u',
        '<url>'
      ],
      protocol: 'browser'
    },
    BS_IE_11: {
      exe: 'node_modules/.bin/browserstack-launch',
      args: [
        '--os',
        'Windows',
        '--osv',
        '7',
        '--b',
        'ie',
        '--bv',
        '11.0',
        '-t',
        '1500',
        '--u',
        '<url>'
      ],
      protocol: 'browser'
    }
  }
};
