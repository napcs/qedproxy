var start = function(path, api, port) {

    var version = require('../package.json').version;
    var app,
        express   = require('express'),
        logger = require('connect-logger'),
        serveIndex = require('serve-index'),
        serveStatic = require('serve-static');

    if (!port) {
      port = 4242;
    }


    app = express();
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    // Set up default expose
    app.use(function(req, res, next){
      res.locals.expose = {};
      next();
    });

    app.use(logger());

    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.get('/help', function(req, res){
      res.locals.expose = {
        path: path,
        api: api || false,
        port: port,
        version: version
      };
      res.render("help");
    });

    if (api) {
      var context = '/api';
      var proxy = require('http-proxy-middleware');
      var options = {
        target: api,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api' : ''      // rewrite paths
        },
      };
      var url = require('url');

      app.use(proxy(context, options));
    }

    // serve static files and indexes first
    app.use(serveStatic(path, {'index': ['index.html', 'index.htm']}));

    // fallback to dir listing
    app.use(serveIndex(path, {'icons': true}));

    server = app.listen(port);
    return server;
};

module.exports = {
  start: start
};

