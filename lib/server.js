var start = function(path, api) {

    var app,
        connect   = require('connect'),
        logger = require('connect-logger'),
        serveIndex = require('serve-index'),
        serveStatic = require('serve-static');

    app = connect();
    app.use(logger());

    app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
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

    server = app.listen(4242);
    return server;
};

module.exports = {
  start: start
};

