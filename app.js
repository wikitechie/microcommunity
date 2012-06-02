
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , stylus = require('stylus')
  , bootstrap = require('bootstrap-stylus')
  , mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/microcommunity');

var Post = mongoose.model('Post', new mongoose.Schema({
  name: String,
  text: String
}));

var post;
post = new Post({
	name: "Amjad",
	text: "Hello, MongoDB!"
});

//post.save(function (err) {
//  if (!err) console.log('Success!');
//});

//post.save();


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

//app.get('/', routes.index);

app.get('/', function(req, res){
  Post.find(function(err, posts) {
		console.log(posts[0].name);
		res.render('index', { title: 'MicroCommunity', posts : posts });
  });
});


app.get('/api/posts', function(req, res){
  return Post.find(function(err, posts) {
    return res.send(posts);
  });
});

app.get('/api/posts/:id', function(req, res){
  return Post.findById(req.params.id, function(err, post) {
    if (!err) {
      return res.send(post);
    }
  });
});

app.put('/api/posts/:id', function(req, res){
  return Post.findById(req.params.id, function(err, post) {
    post.text = req.body.text;
    post.name = req.body.name;
    return post.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(post);
    });
  });
});

app.post('/api/posts', function(req, res){
  var post;
  post = new Post({
    text: req.body.text,
    name: req.body.name

  });
  post.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(post);
});


app.listen(3000);
