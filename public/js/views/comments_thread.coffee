define [
	'jquery'
	'backbone'
	'cs!models/comment'
	'cs!views/comment'
	'text!templates/comments_thread.html'
	'jquery.gravatar'
	'general'
	'moment'
], ($, Backbone, Comment, CommentView, comment_thread_template) ->
	class CommentsThreadView extends Backbone.View
	
		className : 'comments-thread'

		template: _.template(comment_thread_template)

		events:
			"keydown .comments-text": "newComment"

		initialize: ->
			_.bindAll @
			
			@collection.bind 'add', @injectComment
			@postId = @options.postId
			@render()


		render: ->
			$(@el).html @template
			@collection.each (comment)=>
				@injectComment comment
			@

		injectView: (view) ->
			$(@el).find('.comments-list').append(view.render().el)

		newComment: (e) ->
			keycode = if e.keyCode then e.keyCode else e.which
			#if enter preseed
			if keycode == 13
				e.preventDefault()
				comment = new Comment
				comment.set 
					text: $(@el).find(".comments-text").val()
					user: current_user
					created_at : Date()
				@addComment comment

		injectComment: (comment) =>
			commentView = new CommentView model: comment
			@injectView commentView

		clearText: ->
			$(@el).find(".comments-text").val("")

		addComment: (comment)->
			comment.url = "api/posts/#{@postId}/comments/"
			comment.save()
			@collection.add comment
			$(@el).find(".comments-text").val("")
			$(@el).find(".comments-text").setCursorPosition(0)

