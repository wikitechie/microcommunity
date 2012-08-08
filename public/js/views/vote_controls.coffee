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
						up_voted : vote
						
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()			
			if @vote_state.get 'up_voted'		
				$(@el).find('.up-vote-control').addClass 'selected-vote-control'
				$(@el).find('.up-vote-control').addClass 'icon-white'
				$(@el).find('.down-vote-control').addClass 'unselected-vote-control'				
			if @vote_state.get 'down_voted'		
				$(@el).find('.down-vote-control').addClass 'selected-vote-control'
				$(@el).find('.down-vote-control').addClass 'icon-white'
				$(@el).find('.up-vote-control').addClass 'unselected-vote-control'								
			@			
			
		voteAction : (type)->					
			votes_collections =
				'up_voted'   : @up_votes
				'down_voted' : @down_votes
	
			unless @vote_state.get type
				vote = new Vote
					user : current_user
				vote.url = "#{@model.urlRoot}/#{@model.id}/votes/"
				
				vote.save()
					#success : ()->
				votes_collections[type].add vote
				state = {}
				state[type] = vote
				@vote_state.set state
						
			else			
				d = @up_votes.find (vote)->
					return vote.get('user').id is current_user._id
				votes_collections[type].remove d
				state = {}
				state[type] = false				
				@vote_state.set state
							
		upVote : ()->
			@voteAction 'up_voted'

		
		downVote : ()-> 
			@voteAction 'down_voted'		


					
