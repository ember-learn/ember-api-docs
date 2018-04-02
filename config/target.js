/* eslint-env node */

let browsers = [
  'ie 9-11',
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions'
];

if (process.env.EMBER_ENV === 'development' || process.env.EMBER_ENV === 'test') {
  browsers = [
    'last 1 Chrome versions',
    'last 1 Firefox versions'
  ];
}

module.exports = {
  browsers
};
