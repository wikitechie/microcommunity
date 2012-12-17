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
			
			if current_user?
				publisher = new Publisher
					parent : app.data.group
					parent_type : "groups"							
			
			socialStream = new ActivityStream
				activities: app.data.activities
				group : app.data.group._id			
				
			
