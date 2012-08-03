define [
	'jquery'
	'backbone'
	'cs!publisher'
	'cs!activity_stream'
], ($, Backbone, Publisher, ActivityStream) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->		
			window.current_user = eval(user)		
			
			if current_user?
				publisher = new Publisher()			
			socialStream = new ActivityStream
				activities: eval(activities)
