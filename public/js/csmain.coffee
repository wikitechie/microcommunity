define [
	'jquery'
	'underscore'
	'backbone'
	'cs!router'
	'bootstrap-notify'
], ($, _, Backbone, router) ->
	'use strict'
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events);
	
	window.socket = io.connect('http://localhost')
	
	socket.on 'new-activity', (data)->
    $('.bottom-left').notify({message : {text : data.message } }).show()

  window.mediator.bind "new-silent-activity", (activity)=>
  	socket.emit('new-activity', { activity : activity.toJSON() })
  	
  window.mediator.bind "new-activity", (activity)=>
  	socket.emit('new-activity', { activity : activity.toJSON() })    
	
	appRouter = new router()
	Backbone.history.start()



