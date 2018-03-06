/* eslint-env node */
let isMasterBuild = process.env.TRAVIS_BRANCH === "master";

let localBrowsers = ["Chrome"];

let allBrowsers = [
  ...localBrowsers,
  "Firefox",
  "BS_Safari_Current",
  "BS_Safari_Last",
  "BS_MS_Edge",
  "BS_IE_11"
];

let ciBrowsers = isMasterBuild ? allBrowsers : localBrowsers;

module.exports = {
  test_page: "tests/index.html?hidepassed",
  disable_watching: true,
  timeout: 1200,
  browser_start_timeout: 2000,
  parallel: 4,
  launch_in_ci: ciBrowsers,
  launch_in_dev: localBrowsers,
  browser_args: {
    Chrome: {
      mode: "ci",
      args: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.TRAVIS ? "--no-sandbox" : null,

        "--disable-gpu",
        "--headless",
        "--remote-debugging-port=9222",
        "--window-size=1440,900"
      ].filter(Boolean),
      Firefox: ["-headless"]
    },
    launchers: {
      BS_Safari_Current: {
        exe: "node_modules/.bin/browserstack-launch",
        args: [
          "--os",
          "OS X",
          "--osv",
          "High Sierra",
          "--b",
          "safari",
          "--bv",
          "11",
          "-t",
          "1200",
          "--u",
          "<url>"
        ],
        protocol: "browser"
      },
      BS_Safari_Last: {
        exe: "node_modules/.bin/browserstack-launch",
        args: [
          "--os",
          "OS X",
          "--osv",
          "Sierra",
          "--b",
          "safari",
          "--bv",
          "10.1",
          "-t",
          "1200",
          "--u",
          "<url>"
        ],
        protocol: "browser"
      },
      BS_MS_Edge: {
        exe: "node_modules/.bin/browserstack-launch",
        args: [
          "--os",
          "Windows",
          "--osv",
          "10",
          "--b",
          "edge",
          "--bv",
          "latest",
          "-t",
          "1200",
          "--u",
          "<url>"
        ],
        protocol: "browser"
      },
      BS_IE_11: {
        exe: "node_modules/.bin/browserstack-launch",
        args: [
          "--os",
          "Windows",
          "--osv",
          "7",
          "--b",
          "ie",
          "--bv",
          "11.0",
          "-t",
          "1500",
          "--u",
          "<url>"
        ],
        protocol: "browser"
      }
    }
  }
};
