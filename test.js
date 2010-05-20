#!/usr/bin/env node
var sys = require('sys'),
  fs = require('fs'),
  htmlparser = require('./lib/node-htmlparser'),
  http = require('http');

var getHttpResponseBody = function(http, host, path, callback){
  var client = http.createClient(80, host);
  var request = client.request('GET', '/',
    {'host': host});
  request.addListener('response', function (response) {
    var body="", i=0;
    response.setEncoding('utf8');
    response.addListener('data', function (chunk) {
      body+=chunk;
    });
    response.addListener('end', function(){
      callback(body);  
    });
  });
  request.end();
};

var getDom = function(htmlparser, body, callback){
  var handler =  new htmlparser.DefaultHandler(function(error, dom){
    callback(dom);  
  });
  var parser = new htmlparser.Parser(handler);
  parser.parseComplete(body);
}

getHttpResponseBody(http, 'nodejs.debuggable.com', '/', function(body){
  getDom(htmlparser, body, function(dom){
    var links = htmlparser.DomUtils.getElementsByTagName('a', dom);
    sys.puts(links.length);
  });
});


