requirejs.config({
	baseUrl: "../client",

  paths: {
  	bb : 'lib/bb',
    cs: 'cs',
    jquery : 'lib/jquery',
    underscore: 'lib/underscore',    
    backbone : 'lib/backbone',
    'backbone-relational' : 'lib/backbone.relational', 
    'backbone-marionette' : 'lib/backbone.marionette', 

    text : 'lib/require/text',
       
    bootstrap: 'lib/bootstrap.min',
    bootbox: 'lib/bootbox.min',    
    'jquery.gravatar': 'lib/jquery.gravatar',
    'jquery.spin': 'lib/jquery.spin',
    'spin': 'lib/spin.min',
    'md5' : 'lib/md5',
    'general' : 'lib/general',
    'moment' : 'lib/moment.min',
    'diff' : 'lib/diff',
  },
  
  shim: {
  	'backbone' : {
  		deps: ["underscore", "jquery"],
  		exports: "Backbone"
  	}, 
  	'backbone-relational' : ['backbone'],
  	'backbone-marionette' : ['backbone'],  	
  	'underscore' : {
  		exports : "_"
  	},  
  	'jquery' : {
  		exports : 'jQuery'
  	},  	
  	'jquery.gravatar' : ['jquery', 'md5'],
  	'jquery.spin' : ['jquery', 'spin'],
  	'md5' : [],
  	'general' : ['jquery'],
  	'moment' : [],
  	'diff' : [],
  	'bootstrap-notify': ['jquery'],
  	'bootbox' : ['bootstrap'],

  	'bootstrap' : {
  		exports: ''
  	}  	
  }  
})

//Here we load the main app and start it by passing data from the server
//You SHOULD always refer to your app with the global App variable
if (typeof server != 'undefined' ){
	if (server.appName){
		requirejs(['apps/' + server.appName + '/main'], function(app){	
			if (app){
				App = app
				App.start(server.data)	
			}	
		})	
	}	
}



