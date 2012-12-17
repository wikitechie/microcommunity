define([
	'jquery',
	'underscore',
	'backbone',
	'cs!pages/home/router',
	'bootstrap-notify'
], function($, _, Backbone, router){
	'use strict'
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events);
	window.current_user = app.current_user
	
	window.socket = io.connect('http://localhost')
	
	socket.on( 'new-activity', function(data){
	  $('.bottom-left').notify({message : {text : data.message } }).show()
	})
  

  window.mediator.bind("new-silent-activity", function(activity){
	  socket.emit('new-activity', { activity : activity.toJSON() })
  })
  
  
  	
  window.mediator.bind( "new-activity", function(activity){
		socket.emit('new-activity', { activity : activity.toJSON() })  
  })
  	    
	
	var appRouter = new router()
	Backbone.history.start()



})

