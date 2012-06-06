class window.ContentStream extends Backbone.View

	el: '#content-deck'
	template: _.template($('#content-stream-template').html()),

	initialize: ->
		_.bindAll @

		@wikipages = new WikiPages
		@wikipages.bind 'add', @injectWikipage

		@questions = new Questions
		@questions.bind 'add', @injectQuestion

		window.mediator.bind "new-wikipage", (wikipage)=>
		  @addWikipage wikipage

		window.mediator.bind "new-question", (question)=>
		  @addQuestion question

		@render()

		$('#content-stream-table').masonry
			 itemSelector : '.well'
			 isAnimated: true

		link = new Link
		linkView = new LinkView	model: link
		@injectView linkView



		wikipage = new WikiPage
		wikipage.set	{title: "Node.js",	body: "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."}

		wikipageView = new WikiPageView	model: wikipage
		@injectView wikipageView

	render: ->
		$(@el).html @template
		@


	injectWikipage: (wikipage)=>
		wikipageView = new WikiPageView	model: wikipage
		$("#content-stream-table").prepend(wikipageView.render().el).masonry( 'reload' )

	injectQuestion: (question)=>
		console.debug "injecting question"
		questionView = new QuestionView	model: question
		@injectView questionView

	injectView: (view)=>
		$("#content-stream-table").prepend(view.render().el).masonry( 'reload' )

	addWikipage: (wikipage)=>
		@wikipages.add wikipage

	addQuestion: (question)=>
		@questions.add question

