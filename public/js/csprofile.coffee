define [
	'jquery'
	'backbone'
	'cs!publisher'
	'cs!activity_stream'
	'cs!views/follow_button'
	'cs!models/user'
], ($, Backbone, Publisher, ActivityStream, FollowButton, User) ->
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events)

	window.current_user = eval(current_user)	


	
	myuser = new User window.current_user

	
	followButton = new FollowButton
		model : myuser
		
		
	$('.follow-button-area').html followButton.render().el
	
	socialStream = new ActivityStream
		activities: eval(activities)
		user : eval(user)._id
