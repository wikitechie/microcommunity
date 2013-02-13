
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , fs = require('fs')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , async = require('async')
  , Resource = require('express-resource')
  , activities_provider = require('./providers/activities-provider')
  , users_provider = require('./providers/users-provider')  
  , wikipages_provider = require('./providers/wikipages-provider')    
  , groups_provider = require('./providers/groups-provider')  
  , follows_provider = require('./providers/follows-provider')    
  , database = require('./providers/db')
  , comments_api = require('./api/comments')
  , votes_api = require('./api/votes')  
  ;

//database and providers setup
var db;
database.connectDB(function(err, database){
	db = database;
	if (database === null || database === undefined)
		throw new Error("cannot establish database connection, is mongo server running ?!");
	activities_provider.setup(database);
	users_provider.setup(database);	
	wikipages_provider.setup(database);		
	follows_provider.setup(database);		
	comments_api.setup(database)
	votes_api.setup(database)
	groups_provider.setup(database)
	console.log( 'Connection to database established...')
});

//setting up database
d = require('./db/db')
usersController = require('./controllers/users')
d.connect(function(){
	console.log('db object connected')
})

//setting up passport before app configuration
require('./passport')

//app setup and configuration
var app = express.createServer();

app.configure(function(){

  //a middleware for rendering pages while passing js data to the client
  app.use(function(req, res, next){
		res.loadPage = function (app, data){
			res.render(app, { 
				app : {
					name: app,
					data: data,
					current_user: req.user			
				}
			});
		}	
		next()
	})     
	
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('keyboard cat'));
  app.use(flash());
  app.use(express.session());  
  app.use(passport.initialize());
  app.use(passport.session());  
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
  app.use('/client', express.static(__dirname + '/client-built'));      
  app.use('/client', express.static(__dirname + '/client'));      
  app.use(express.static(__dirname + '/test/client'));   
  app.use('/shared', express.static(__dirname + '/shared'));

  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


//authentication pages
var auth = require('./routes/auth');
auth.install(app, db);

//middleware for initializing app variable
app.locals.app = false;


//main app
app.get('/', function(req, res){
	groups_provider.fetchAll(0, 5, function(err, groups){
		activities_provider.fetchActivities(0,5,function(err, activities){
			res.loadPage('home', {
				groups: groups,
				activities: activities
			})
		});	
	})
});



//profile app
app.get('/profile/:id', function(req, res){
	
	users_provider.fetch( req.params.id, function(err, user){
		activities_provider.fetchUserActivities(req.params.id, 0,5,function(err, activities){	
			res.loadPage('profile', {
				activities: activities, 
				profile: user, 
				user: user		
			})		

		})
	})
	
});


//group app

app.get('/groups/:id', function(req, res){

	activities_provider.fetchGroupActivities(req.params.id, 0,5,function(err, activities){	
		groups_provider.fetchAll(0, 5, function(err, groups){
			groups_provider.fetch(req.params.id, function(err, group){
					
				res.loadPage('group', {
					activities: activities, 
					groups: groups, 
					group: group, 
				})				
				
			})
		})	
	})

});

app.post('/groups', function(req, res){	
	console.log(req.body.creator)
	groups_provider.create(req.body, req.body.creator, function(err, new_group){
		res.redirect('/groups/'+ new_group._id)
	})	
});

//wikipage app

app.get('/wikipages/:id', function(req, res){
	wikipages_provider.fetch(req.params.id, function(err, wikipage){
		console.log(wikipage)
		activities_provider.fetchWikiPageActivities(req.params.id, 0,5,function(err, activities){	
			res.loadPage('wikipage', { 
				wikipage: wikipage, 
				activities: activities,
			});
		});
	})
		
})

//loading api
app.resource('api/posts', require('./api/posts'));
app.resource('api/:collection/:id/comments', comments_api);    
app.resource('api/wikipages', require('./api/wikipages'));
app.resource('api/activities', require('./api/activities'));        
app.resource('api/:collection/:id/:type/votes', votes_api);        


app.post('/api/users/:follower/follows/:followed', function(req, res){
	follows_provider.follow(req.params.follower, req.params.followed, function(err){
		res.send({success : true})		
		console.log(err)		
	})
	
});

app.delete('/api/users/:follower/follows/:followed', function(req, res){
	follows_provider.unfollow(req.params.follower, req.params.followed, function(err){
		res.send({success : true})		
		console.log(err)		
	})	
});


//providing libraries for client testing
if(app.get('env') == 'test'){
	app.get('/test', function(req, res){
		fs.createReadStream(__dirname + '/test/client/runner.html').pipe(res);
	});

	app.get('/mocha', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/mocha/mocha.js').pipe(res);
	});
	
	app.get('/chai', function(req, res){
		fs.createReadStream(__dirname + '/node_modules/chai/chai.js').pipe(res);
	});
		
}



app = app.listen(3000);
var io = require('socket.io').listen(app);
var activityMessage = require('./shared/activity-message')
//backboneio.listen(app, require('./providers/backends-provider.js'));

io.sockets.on('connection', function (socket) {
  socket.on('new-activity', function (data) {
  	var message = activityMessage.message(data.activity, true)
    socket.broadcast.emit('new-activity', { message: message });
  });
});



