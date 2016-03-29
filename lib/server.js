/*jshint node:true*/
var FastbootServer = require('ember-fastboot-server');

function CachedFastbootServer(options) {
  FastbootServer.apply(this, arguments);
  options = options || {};
  this.client = options.client;
}
CachedFastbootServer.prototype = Object.create(FastbootServer.prototype);
CachedFastbootServer.constructor = CachedFastbootServer;

CachedFastbootServer.prototype.handleSuccess = function(res, path, result, startTime) {
  var html = this.insertIntoIndexHTML(result.title, result.body, result.head);
  this.client.set(path, html, function(err, success) {
    if (err) {
      console.log('redis: failed to write ' + path);
    }
    res.send(html);
  });
};

module.exports = CachedFastbootServer;
