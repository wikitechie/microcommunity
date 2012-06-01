class window.PostView extends Backbone.View
	template: _.template($('#post-template').html()),

	initialize: ->
		@commentsThread = new CommentsThreadView

		comment = new Comment
		commentView = new CommentView model: comment
		@commentsThread.injectView commentView

		_.bindAll @

	render: ->
		$(@el).html @template(@model.attributes)
		$(@el).find('.comments-thread').html @commentsThread.render().el
		@

