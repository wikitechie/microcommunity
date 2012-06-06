class window.AnswerView extends Backbone.View

	template: _.template($('#answer-template').html()),

	initialize: ->
		_.bindAll @


	render: ->
		$(@el).html @template @model.attributes
		$(@el).find('#tooltip').tooltip()
		@

