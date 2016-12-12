/* eslint node:true */
const redisClient = require('redis').createClient(process.env.REDIS_URL);

redisClient.once('ready', function () {
  redisClient.flushall(function () {
    console.log('Flushed redis cache');
    redisClient.quit();
  });
});
