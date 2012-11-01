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
			$(@el).html @template _.extend(@model.toJSON(), { author : @model.get('author').toJSON() })
			$(@el).find('.comments-thread-area').html @commentsThread.render().el
			@

