var qed = require('../lib/server');
var should = require('should');
var request = require('request');
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

describe("serves stuff", function() {

  it("serves an api response proxied", function(done) {

    var body = "";

    // get real resoonse
    request('http://api.open-notify.org/astros.json', function(error, response, body){
      body = response.body;

      server = qed.start("public", "http://api.open-notify.org");
      request('http://localhost:4242/api/astros.json', function(error, response, body){
        should.not.exist(error);
        response.statusCode.should.equal(200);
        body.should.equal(body);
        server.close(done);
      });
    });

  });

  it("serves a static page", function(done) {
    server = qed.start("public", "");

    fileContents = fs.readFileSync('./public/index.html').toString();
    request('http://localhost:4242/', function(error, response, body){
      should.not.exist(error);
      response.statusCode.should.equal(200);
      fileContents.should.equal(body);

      server.close(done);
    });
  });

  it("serves a static page even with api option", function(done) {
    server = qed.start("public", "http://api.open-notify.org");

    fileContents = fs.readFileSync('./public/index.html').toString();
    request('http://localhost:4242/', function(error, response, body){
      should.not.exist(error);
      response.statusCode.should.equal(200);
      fileContents.should.equal(body);

      server.close(done);
    });
  });

  it("sets cors headers", function(done){

    server = qed.start("public", "http://api.open-notify.org");
    request('http://localhost:4242/api/astros.json', function(error, response, body){
      should.not.exist(error);
      response.headers["access-control-allow-origin"].should.equal("*");
      response.statusCode.should.equal(200);

      server.close(done);
    });
  });

  it("serves folder listings", function(done){
    server = qed.start(".", "http://api.open-notify.org");
    request('http://localhost:4242/', function(error, response, body){
      should.not.exist(error);
      response.headers["access-control-allow-origin"].should.equal("*");
      response.statusCode.should.equal(200);
      body.should.containEql("package.json");
      server.close(done);
    });
  });

  it("serves the help page", function(done){
    server = qed.start(".", "http://api.open-notify.org");
    request('http://localhost:4242/help', function(error, response, body){
      should.not.exist(error);
      response.statusCode.should.equal(200);
      body.should.containEql("<h1>qedproxy");
      server.close(done);
    });

  });

  it("has configurable port", function(done){
    server = qed.start("public", "", "9999");
    request('http://localhost:9999/help', function(error, response, body){
      should.not.exist(error);
      response.statusCode.should.equal(200);
      server.close(done);
    });

  });

});
