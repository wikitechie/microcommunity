class window.AnswerView extends Backbone.View

	#template: _.template($('#answer-template').html()),

	events:
		"click .icon-chevron-up": "upvote"
		"click .icon-chevron-down": "downvote"

	initialize: ->
		_.bindAll @


	render: ->
		$(@el).html @template @model.attributes
		$(@el).find('#tooltip').tooltip()
		@

	upvote: ->
		@model.set('votes', @model.get('votes') + 1)
		@render()

	downvote: ->
		@model.set('votes', @model.get('votes') - 1)
		@render()

