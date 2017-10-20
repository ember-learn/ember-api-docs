/* eslint-env node */
/* eslint-disable no-console */
const ServiceKey = process.env['FASTLY_SERVICE_ID'];
const FastlyPurgeKey = process.env['FASTLY_PURGE_KEY'];
const Fastly = require('fastly');


if (!ServiceKey || !FastlyPurgeKey) {
  console.log(`Not purging fastly cache. Service Key: '${ServiceKey}'. Purge Key length: '${FastlyPurgeKey ? FastlyPurgeKey.length : 0}' `);
  process.exit();
}

const fastly = Fastly(FastlyPurgeKey);

fastly.purgeAll(ServiceKey,  (err, fastlyResponseBody) => {
  const prettyjson = require('prettyjson');
  if (err) {
    return console.log(prettyjson.render(err, {}));
  }

  console.log(prettyjson.render(fastlyResponseBody, {}));
  console.log('All content purged.');
});
