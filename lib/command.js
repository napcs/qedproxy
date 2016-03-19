/* CLI application */
var runner = function() {
  var pjson = require('../package.json');
  var version = pjson.version;
  var resolve = require('path').resolve;
  var path = resolve(process.argv[2] || 'public');
  var api = process.argv[3];
  var server = require("../lib/server");
  console.log("Starting QEDProxy v" + version + "...");
  console.log("Serving pages from : " + path);
  if(api) {
    console.log("Proxying " + api + " to /api/");
  }

  server.start(path, api);

};

module.exports = {
  run: runner
};
