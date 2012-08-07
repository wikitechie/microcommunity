define [
	'jquery'
	'backbone'
	'cs!views/comments_thread'	
	'text!templates/diff.html'
], ($, Backbone, CommentsThreadView,template) ->
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
			_.bindAll @

		render: ->	
			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread-area').html @commentsThread.render().el	
			$(@el).find('.comments-thread-area').hide()	
			$(@el).find('.vote-controls').hide()	
			@

		toggleDiff : (callback)->			
			$(@el).find('.diff-content').slideToggle()				

		toggleComment : ->
			unless $(@el).find('.diff-content').is(":visible")
				$(@el).find('.diff-content').slideToggle 'slow', ()=>
					$(@el).find('.comments-thread-area').slideToggle()
			else
					$(@el).find('.comments-thread-area').slideToggle()	
					
					
					
					
