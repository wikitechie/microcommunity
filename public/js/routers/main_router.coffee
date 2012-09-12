define [
	'jquery'
	'backbone'
	'cs!publisher'
	'cs!activity_stream'
	'cs!views/notification_menu'
	'cs!views/buttons/new_group_button'
], ($, Backbone, Publisher, ActivityStream, NotificationMenu, NewGroupButton) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->		
			window.current_user = eval(current_user)		
			
			if current_user?
				publisher = new Publisher
					parent : current_user._id
					parent_type : "users"					
			
			btn = new NewGroupButton()	
			
			el = btn.render().el
			$(el).addClass 'pull-right'
			$('.new-group-button-area').html el
			
			socialStream = new ActivityStream
				activities: eval(activities)				
				
			notifications = new NotificationMenu
			$('.main-nav').append notifications.render().el
				
			
