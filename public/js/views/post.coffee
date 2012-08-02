define [
	'jquery'
	'backbone'
	'text!templates/post.html'
	'jquery.gravatar'
	'general'
	'moment'
], ($, Backbone, postTemplate) ->
	class PostView extends Backbone.View
		className: "post"
		template: _.template(postTemplate)

		initialize: ->
			#@commentsThread = new CommentsThreadView 
				#collection: @model.get('comments')
				#postId: @model.id			
			_.bindAll @

		render: ->	
			$(@el).html @template @model.toJSON()
			#$(@el).find('.comments-thread').html @commentsThread.render().el
			#unless window.current_user?
				#$(@el).find('.comments-text').hide()
			@

