class window.CommentsThreadView extends Backbone.View

	template: _.template($('#comments-thread-template').html())

	events:
		"keydown .comments-text": "newComment"

	initialize: ->
		_.bindAll @
		@collection.bind 'add', @injectComment
		@render()


	render: ->
		$(@el).html @template
		@collection.each (comment)=>
			@injectComment comment
		@

	injectView: (view) ->
		$(@el).find('.comments-list').append(view.render().el)
		$("#social-stream-table").masonry( 'reload' )
		$("#content-stream-table").masonry( 'reload' )

	newComment: (e) ->
		keycode = if e.keyCode then e.keyCode else e.which
		#if enter preseed
		if keycode == 13
			e.preventDefault()
			comment = new Comment
			comment.set text: $(@el).find(".comments-text").val()
			@addComment comment



	injectComment: (comment) =>
		commentView = new CommentView model: comment
		@injectView commentView

	clearText: ->
		$(@el).find(".comments-text").val("")

	addComment: (comment)->
		@collection.add comment
		$(@el).find(".comments-text").val("")
		$(@el).find(".comments-text").setCursorPosition(0)

