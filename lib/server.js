/*jshint node:true*/
var FastbootAppServer = require('fastboot-app-server');

// class CachedFastbootServer extends FastbootServer {
//   constructor(options) {
//     super(...arguments);
//     options = options || {};
//     this.client = options.client;
//   },
//
//   handleSuccess(res, path, result, startTime) {
//     var html = this.insertIntoIndexHTML(result.title, result.body, result.head);
//     this.client.set(path, html, function(err, success) {
//       if (err) {
//         console.log('redis: failed to write ' + path);
//       }
//       res.send(html);
//     });
//   },
//
//   handleFailure(res, path, error, startTime) {
//     if (error.name === "UnrecognizedURLError") {
//       this.log(404, "Not Found " + path, startTime);
//       res.sendStatus(404);
//     } else {
//       console.log(error.stack);
//       this.log(500, "Unknown Error: " + error, startTime);
//       res.sendStatus(200); // resiliant
//     }
//   }
// }

module.exports = FastbootAppServer;
