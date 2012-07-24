class window.QuestionView extends Backbone.View
	className: "question row-fluid"
	#template: _.template($('#question-template').html()),

	initialize: ->
		@answersThread = new AnswersThreadView
		_.bindAll @

	render: ->
		$(@el).html @template(@model.attributes)
		$(@el).find('.answers-thread').html @answersThread.render().el
		@

