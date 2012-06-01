class window.LinkView extends Backbone.View

	thumbnailTemplate: _.template($('#link-template-thumbnail').html())
	curatedTemplate: _.template($('#link-template-curated').html())


	initialize: ->
		_.bindAll @
		@setTemplate "curated"

	render: ->
		$(@el).html @template @model.attributes

		@

	setTemplate: (mode) ->
		if (mode =="curated")
			@template = @curatedTemplate
		else
			@template=  @thumbnailTemplate

