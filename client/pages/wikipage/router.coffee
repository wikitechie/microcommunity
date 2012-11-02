define [
	'jquery'
	'backbone'
	'cs!views/publisher'
	'cs!views/activity_stream'
	'cs!models/revision'
	'cs!views/wikipage'
	'cs!views/notification_menu'
	'cs!views/buttons/new_group_button'
], ($, Backbone, Publisher, ActivityStream, Revision, WikiPageView, NotificationMenu, NewGroupButton) ->
	"use strict"
	Backbone.Router.extend
		routes:
			"" : "default"
		default: ->					
			if current_user?
				publisher = new Publisher
					parent : wikipage
					parent_type : "WikiPage"					
								
			btn = new NewGroupButton()	
			el = btn.render().el
			$(el).addClass 'pull-right'
			$('.new-group-button-area').html el

			socialStream = new ActivityStream
				activities: eval(activities)	
				wikipage : wikipage._id			
				
			#rev = new Revision wikipage.current_revision
			#wikipageView = new WikiPageView
				#model : rev
			#$('.wikipage-area').html rev			
			
