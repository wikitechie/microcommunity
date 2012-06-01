class window.LinkView extends Backbone.View

	thumbnailTemplate: _.template($('#link-template-thumbnail').html())
	curatedTemplate: _.template($('#link-template-curated').html())


	initialize: ->
		_.bindAll @
		@template = @curatedTemplate

	render: ->
		$(@el).html @template @model.attributes

		@

