class window.AnswersThreadView extends Backbone.View

	#template: _.template($('#answers-thread-template').html())

	events:
		"keydown .answers-text": "newAnswer"

	initialize: ->
		_.bindAll @
		@collection = new Comments
		@collection.bind 'add', @injectAnswer
		@render()

	render: ->
		$(@el).html @template
		@collection.each (answer)=>
			@injectAnswer answer
		@

	injectView: (view) ->
		$(@el).find('.answers-list').append(view.render().el)
		$("#content-stream-table").masonry( 'reload' )

	newAnswer: (e) ->
		keycode = if e.keyCode then e.keyCode else e.which
		#if enter preseed
		if keycode == 13
			e.preventDefault()
			answer = new Answer
			answer.set text: $(@el).find(".answers-text").val()
			@collection.add answer
			$(@el).find(".answers-text").val("")
			$(@el).find(".answers-text").setCursorPosition(0)

	injectAnswer: (answer) =>
		answerView = new AnswerView model: answer
		@injectView answerView

	clearText: ->
		$(@el).find(".comments-text").val("")

