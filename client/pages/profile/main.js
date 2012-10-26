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

	window.current_user = eval(current_user)	

	var followButton = new FollowButton({
		follower : new User(window.current_user),
		followed : new User(window.user)
	})		
		
	$('.follow-button-area').html(followButton.render().el)
	var src = $.gravatar(window.user.email, { size: 100 })
	var img = "<img src='#{src}'/>"
	$('.profile-photo').html(img)
	
	socialStream = new ActivityStream({
		activities: eval(activities),
		user : eval(user)._id
	})
	
})

