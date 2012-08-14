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

	followButton = new FollowButton
		follower : new User window.current_user
		followed : new User window.user
		
		
	$('.follow-button-area').html followButton.render().el
	src = $.gravatar(window.user.email, { size: 100 })
	img = "<img src='#{src}'/>"
	$('.profile-photo').html(img)
	
	socialStream = new ActivityStream
		activities: eval(activities)
		user : eval(user)._id
