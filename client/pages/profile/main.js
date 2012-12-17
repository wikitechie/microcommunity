define([
	'jquery',
	'backbone',
	'cs!views/publisher',
	'cs!views/activity_stream',
	'cs!views/buttons/follow_button',
	'cs!models/user'
], function($, Backbone, Publisher, ActivityStream, FollowButton, User){
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events)

	window.current_user = app.current_user

	var followButton = new FollowButton({
		follower : new User(window.current_user),
		followed : new User(app.data.user)
	})		
		
	$('.follow-button-area').html(followButton.render().el)
	var src = $.gravatar(app.data.user.email, { size: 100 })
	var img = "<img src='#{src}'/>"
	$('.profile-photo').html(img)
	
	socialStream = new ActivityStream({
		activities: app.data.activities,
		user : app.data.user._id
	})
	
})

