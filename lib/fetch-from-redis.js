/*jshint node:true */
module.exports = function() {
  var redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
  var redis = require('redis');
  var client = redis.createClient(redisURL);

  return function fetchFromRedis(req, res, next) {
    console.log('redis: fetching path', req.path);
    client.get(req.path, function(err, reply) {
      if (err || reply === null) {
        console.log('redis: key not found', req.path);
        next();
        return;
      }
      console.log('redis: key found', req.path);
      res.send(reply);
    });
  };
};
