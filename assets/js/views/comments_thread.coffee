class window.CommentsThreadView extends Backbone.View

	template: _.template($('#comments-thread-template').html())

	events:
		"keyup .comments-text": "newComment"

	initialize: ->
		_.bindAll @
		@comments = new Comments
		@comments.bind 'add', @injectComment

		@render()

	render: ->
		$(@el).html @template
		@

	injectView: (view) ->
		console.debug "injecting..."
		$(@el).find('.comments-list').append(view.render().el)
		$("#social-stream-table").masonry( 'reload' )

	newComment: (e) ->
		keycode = if e.keyCode then e.keyCode else e.which
		#if enter preseed
		if keycode == 13
			comment = new Comment
			comment.set text: $(@el).find(".comments-text").val()
			@comments.add comment
			$(@el).find(".comments-text").val("")
			$(@el).find(".comments-text").setCursorPosition(0)

	injectComment: (comment) =>
		commentView = new CommentView model: comment
		@injectView commentView


	clearText: ->
		$(@el).find(".comments-text").val("")

