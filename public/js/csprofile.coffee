define [
	'jquery'
	'backbone'
	'cs!publisher'
	'cs!activity_stream'
], ($, Backbone, Publisher, ActivityStream) ->
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events)

	window.current_user = eval(current_user)		
	
	socialStream = new ActivityStream
		activities: eval(activities)
		user : eval(user)._id
