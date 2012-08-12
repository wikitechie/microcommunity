define [
	'jquery'
	'backbone'
	'text!templates/follow_button.html'
], ($, Backbone,template) ->
	class FollowButton extends Backbone.View
	
		className: "follow-button"
		template: _.template(template)
		btn : ".btn-follow"
		
		events : 
			'click .btn-follow' : "toggleFollow"
			'mouseover .btn-follow' : "askToUnfollow"
			'mouseout .btn-follow' : 'removeAskToUnfollow'

		initialize: ()->		
			@follower = @options.follower
			@followed = @options.followed
			
			@isFollowing = false
			_.each @follower.get('follows'), (followed) =>
				if @followed.id is followed
					@isFollowing = true
				
			
			@url =  @follower.urlRoot + '/' + @follower.id + '/follows'
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()
			
			if @isFollowing
				@setFollowing()
			
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
				url   : @url + '/' + @followed.id
				type  : "POST"
			$.ajax _.extend params, options
		
		unfollow : (options) ->
			params = 
				url   : @url + '/' + @followed.id
				type  : "DELETE"
			$.ajax _.extend params, options			
			
		toggleFollow :->
			unless @isFollowing
				@follow
					success : ()=>
						@setFollowing()
						@isFollowing = true
			else
				@unfollow
					success : ()=>
						@setUnfollowed()
						@isFollowing = false
				
			
