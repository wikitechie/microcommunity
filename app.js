
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , stylus = require('stylus')
  , bootstrap = require('bootstrap-stylus');

var app = express.createServer();

//function used to configure bootstrap-stylus
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(bootstrap());
}


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(require('connect-assets')());
  app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.listen(3000);

