define [
	'jquery'
	'backbone'
	'cs!views/comments_thread'	
	'cs!views/vote_controls'
	'text!templates/diff.html'
], ($, Backbone, CommentsThreadView, VoteControls, template) ->
	class DiffView extends Backbone.View
		className: "diff"
		template: _.template(template)
	
		events:
			'click .toggle-diff': 'toggleDiff'
			'click .toggle-comment': 'toggleComment'
			'click .comments-summary': 'toggleComment'
								
		initialize: ->
			@commentsThread = new CommentsThreadView 
				collection: @model.get('comments')
				model: @model
				
			@voteControls = new VoteControls	
				up_votes: @model.get 'up_votes'
				down_votes: @model.get 'down_votes'
												
			_.bindAll @

		render: ->	
			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread-area').html @commentsThread.render().el	
			$(@el).find('.vote-controls-area').html @voteControls.render().el
			$(@el).find('.comments-thread-area').hide()				
			@

		toggleDiff : (callback)->			
			$(@el).find('.diff-content').slideToggle()				

		toggleComment : ->
			unless $(@el).find('.diff-content').is(":visible")
				$(@el).find('.diff-content').slideToggle 'slow', ()=>
					$(@el).find('.comments-thread-area').slideToggle()
			else
					$(@el).find('.comments-thread-area').slideToggle()	
					
					
					
					
