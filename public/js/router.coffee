define [
	'jquery'
	'backbone'
	'cs!publisher'
	'cs!activity_stream'
	'cs!views/notification_menu'
], ($, Backbone, Publisher, ActivityStream, NotificationMenu) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->		
			window.current_user = eval(current_user)		
			
			if current_user?
				publisher = new Publisher()			
			socialStream = new ActivityStream
				activities: eval(activities)
				
			notifications = new NotificationMenu
			$('.main-nav').append notifications.render().el
				
			
