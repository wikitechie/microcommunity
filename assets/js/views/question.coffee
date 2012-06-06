class window.QuestionView extends Backbone.View
	template: _.template($('#question-template').html()),

	initialize: ->
		_.bindAll @

	render: ->
		$(@el).html @template(@model.attributes)
		@

