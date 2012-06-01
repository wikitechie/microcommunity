class window.PostView extends Backbone.View
	tagName: "tr"

	template: _.template($('#post-template').html()),

	initialize: ->
		_.bindAll @

	render: ->
		$(@el).html @template @model.attributes

		@

