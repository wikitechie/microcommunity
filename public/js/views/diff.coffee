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
		
		initialize: ->
			@commentsThread = new CommentsThreadView 
				collection: @model.get('comments')
				model: @model
			_.bindAll @

		render: ->	

			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread-area').html @commentsThread.render().el			
			@

		toggleDiff : ->
			$(@el).find('.diff-content').slideToggle()
