define [
	'jquery'
	'backbone'
	'cs!views/publisher'
	'cs!views/activity_stream'
	'cs!views/notification_menu'
], ($, Backbone, Publisher, ActivityStream, NotificationMenu) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->		
			window.current_user = eval(current_user)		
			
			if current_user?
				publisher = new Publisher
					parent : eval(group)
					parent_type : "groups"							
			
			socialStream = new ActivityStream
				activities: eval(activities)	
				group : eval(group)._id			
				
			notifications = new NotificationMenu
			$('.main-nav').append notifications.render().el
				
			
