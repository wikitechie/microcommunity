class window.LinkView extends Backbone.View

	thumbnailTemplate: _.template($('#link-template-thumbnail').html())
	curatedTemplate: _.template($('#link-template-curated').html())


	initialize: ->
		_.bindAll @
		@setTemplate "curated"
		@commentsThread = new CommentsThreadView collection: @model.comments

	render: ->
		$(@el).html @template @model.attributes
		$(@el).find('.comments-thread').html @commentsThread.render().el

		@

	setTemplate: (mode) ->
		if (mode =="curated")
			@template = @curatedTemplate
		else
			@template=  @thumbnailTemplate

