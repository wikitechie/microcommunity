define [
	'jquery'
	'backbone'
	'cs!views/comments_thread'
	'text!templates/post.html'
	'jquery.gravatar'
	'general'
	'moment'
], ($, Backbone, CommentsThreadView, postTemplate) ->
	class PostView extends Backbone.View
		className: "post"
		template: _.template(postTemplate)

		initialize: ->
			@commentsThread = new CommentsThreadView 
				collection: @model.get('comments')
				model: @model
			_.bindAll @

		render: ->	
			#console.debug @model.target
			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread-area').html @commentsThread.render().el
			@

