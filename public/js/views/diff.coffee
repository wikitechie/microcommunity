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
		
		initialize: ->
			@commentsThread = new CommentsThreadView 
				collection: @model.get('comments')
				model: @model
			_.bindAll @

		render: ->	
			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread-area').html @commentsThread.render().el	
			#$(@el).find('.toggle-comment').hide()
			#$(@el).find('.vote-up').hide()
			$(@el).find('.comments-thread-area').hide()	
			@

		toggleDiff : ->
			#$(@el).find('.toggle-comment').toggle()		
			#$(@el).find('.vote-up').toggle()						
			$(@el).find('.diff-content').slideToggle()		

		toggleComment : ->
			$(@el).find('.comments-thread-area').slideToggle()			
