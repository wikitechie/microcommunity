define [
	'jquery'
	'backbone'
	'cs!models/question'
	'cs!models/activity'
	'jquery.spin'
], ($, Backbone, Question, Activity)->
	class QuestionPublisher extends Backbone.View

		button : '#question-button'
		template: _.template($('#question-publisher-template').html()),

		events:
			'click #question-text': 'expand'
			'click #question-button': 'post'

		initialize: ->
			@render()

		render: ->
			$(@el).html @template
			return this

		disable: ->
			$("#question-text").attr("disabled","disabled")
			$(@button).attr("disabled","disabled")
			$(@el).spin()

		enable: ->
			$("#question-text").removeAttr("disabled")
			$("#question-text").val('')
			$(@button).removeAttr("disabled")
			$(@el).spin(false)

		reset: ->
			$("#question-text").val("")
			$("#question-text").attr("rows","1")
			$("#question-title").val("")

		expand: ->
			$("#question-text").attr("rows","3")

		post: ->
			question = new Question
			question.set	{title: $("#question-title").val(),	body: $("#question-text").val()}
			window.mediator.trigger("new-question", question)
			@reset()
			destination = $("#content-deck").offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-40}, 500 );

