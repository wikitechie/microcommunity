define [
	'jquery'
	'backbone'
	'text!templates/vote_controls.html'
	'cs!models/vote'
	'cs!models/vote_state'
], ($, Backbone,template, Vote, VoteState) ->
	class VoteControls extends Backbone.View
		className: "vote-controls"
		template: _.template(template)
		
		events:
			'click .up-vote-control' : 'upVote'
			'click .down-vote-control' : 'downVote'
			
		initialize: ->

			@up_votes = @options.up_votes
			@down_votes = @options.down_votes
			@vote_state = new VoteState
			
			@vote_state.on 'change', @render, @
			
			#initializing state
			@model.get('up_votes').each (vote)=>
				if vote.get('user').id is current_user._id
					@vote_state.set
						up : vote
						
			@model.get('down_votes').each (vote)=>
				if vote.get('user').id is current_user._id
					@vote_state.set
						down : vote												
						
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()			
			if @vote_state.get 'up'		
				$(@el).find('.up-vote-control').addClass 'selected-up-vote-control'
				$(@el).find('.up-vote-control').addClass 'icon-white'
				$(@el).find('.down-vote-control').addClass 'unselected-vote-control'				
				$(@el).find('.down-vote-control').removeClass 'vote-control'
			if @vote_state.get 'down'		
				$(@el).find('.down-vote-control').addClass 'selected-down-vote-control'
				$(@el).find('.down-vote-control').addClass 'icon-white'
				$(@el).find('.up-vote-control').addClass 'unselected-vote-control'	
				$(@el).find('.up-vote-control').removeClass 'vote-control'											
			@			
			
		voteAction : (type)->	
		
			votes_collections =
				'up'   : @up_votes
				'down' : @down_votes
	
			unless @vote_state.get type
				vote = new Vote
					user : current_user
				vote.url = "#{@model.urlRoot}/#{@model.id}/#{type}/votes"

				vote.save {},
					success : ()=>						
						votes_collections[type].add vote
						state = {}
						state[type] = vote
						@vote_state.set state
						
			else			
				d = votes_collections[type].find (vote)->
					return vote.get('user').id is current_user._id

				d.url = "#{@model.urlRoot}/#{@model.id}/#{type}/votes"
				d.destroy
					success : ()=>				
						state = {}
						state[type] = false				
						@vote_state.set state
						votes_collections[type].remove d				
					
							
		upVote : ()->
			unless @vote_state.get 'down'
				@voteAction 'up'

		
		downVote : ()-> 
			unless @vote_state.get 'up'		
				@voteAction 'down'		


					
