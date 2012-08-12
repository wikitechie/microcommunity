define [
	'jquery'
	'backbone'
	'text!templates/follow_button.html'
	'cs!models/follows'
], ($, Backbone,template, Follow) ->
	class FollowButton extends Backbone.View
	
		className: "follow-button"
		template: _.template(template)
		btn : ".btn-follow"
		
		events : 
			'click .btn-follow' : "toggleFollow"
			'mouseover .btn-follow' : "askToUnfollow"
			'mouseout .btn-follow' : 'removeAskToUnfollow'

		initialize: ()->		
			@url =  @model.urlRoot + '/' + @model.id + '/follows'
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()
			unless window.current_user
				$(@el).find('.btn').addClass 'disabled'
				$(@el).find('.btn').removeClass 'btn-follow'
				$(@el).find('.btn').tooltip
					title : "login to follow this user"
				
			@
		
		setFollowing : ()->
			$(@el).find(@btn).html "<i class='icon-ok icon-white'></i> Following"
			$(@el).find(@btn).addClass 'btn-primary'
			$(@el).find(@btn).removeClass 'btn-danger'						
			
		setUnfollowed : ()->
			$(@el).find(@btn).html "Follow"
			$(@el).find(@btn).removeClass 'btn-primary'	
			$(@el).find(@btn).removeClass 'btn-danger'						
						
		askToUnfollow : ()->
			if @isFollowing
				$(@el).find(@btn).html "<i class='icon-remove icon-white'></i> Unfollow"
				$(@el).find(@btn).addClass 'btn-danger'

		removeAskToUnfollow : ()->
			if @isFollowing		
				$(@el).find(@btn).removeClass 'btn-danger'			
				@setFollowing()					

		
		follow : (options) ->
			params = 
				url   : @url
				type  : "POST"
			$.ajax _.extend params, options
		
		unfollow : (options) ->
			params = 
				url   : @url
				type  : "DELETE"
			$.ajax _.extend params, options			
			
		toggleFollow :->
			unless @isFollowing
				@follow()
				@setFollowing()
				@isFollowing = true
			else
				@unfollow()
				@setUnfollowed()
				@isFollowing = false
				
			
