/* CLI application */
var runner = function() {
  var api, opts, path, port, version, resolve, server;

  opts    = require('opts');
  resolve = require('path').resolve;
  version = require('../package.json').version;
  server  = require("../lib/server");

  opts.parse([
      {
        short: "v",
        long:  "version",
        description: "Show the version",
        required: false,
        callback: function() {
          console.log(version);
          process.exit(1);
        }
      },
      {
        short: "a",
        long:  "api",
        description: "Speficy the endpoint to proxy to",
        required: false,
        value: true
      },
      {
        short: "p",
        long:  "port",
        description: "Specify the port. Default is 4242",
        required: false,
        value: true
      }
  ].reverse(), true);

  port = opts.get('port') || 4242;

  path = resolve(process.argv[2] || 'public');

  port = opts.get('port') || 4242;
  api = opts.get('api') || false;


  console.log("Starting QEDProxy v" + version + " on http://localhost:" + port + "...");
  console.log("Serving pages from : " + path);

  if (api) {
    console.log("Proxying " + api + " to /api/");
  }

  server.start(path, api, port);

};


module.exports = {
  run: runner
};
