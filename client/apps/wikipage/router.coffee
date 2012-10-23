define [
	'jquery'
	'backbone'
	'cs!views/publisher'
	'cs!views/activity_stream'
	'cs!views/notification_menu'
	'cs!views/buttons/new_group_button'
], ($, Backbone, Publisher, ActivityStream, NotificationMenu, NewGroupButton) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->					
			if current_user?
				publisher = new Publisher
					parent : current_user
					parent_type : "users"					
								
			btn = new NewGroupButton()	
			
			el = btn.render().el
			$(el).addClass 'pull-right'
			$('.new-group-button-area').html el
			
			socialStream = new ActivityStream
				activities: eval(activities)				
				
			notifications = new NotificationMenu
			$('.main-nav').append notifications.render().el
				
			
