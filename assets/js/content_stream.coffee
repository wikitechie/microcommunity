class window.ContentStream extends Backbone.View

	el: '#content-deck'
	template: _.template($('#content-stream-template').html()),

	initialize: ->
		_.bindAll @

		@wikipages = new WikiPages
		@wikipages.bind 'add', @injectWikipage

		@questions = new Questions
		@questions.bind 'add', @injectQuestion

		@links = new Links
		@links.bind 'add', @injectLink

		window.mediator.bind "new-wikipage", (wikipage)=>
		  @addWikipage wikipage

		window.mediator.bind "new-question", (question)=>
		  @addQuestion question

		window.mediator.bind "new-link", (link)=>
		  @addLink link

		@render()

		$('#content-stream-table').masonry
			 itemSelector : '.card'
			 isAnimated: true

		#initializing posts rendered from the server
		@wikipages.add eval(wikipages)

		question = new Question
		questionView = new QuestionView	model: question
		@injectView questionView

		link = new Link
		linkView = new LinkView	model: link
		@injectView linkView


	render: ->
		$(@el).html @template
		@

	injectView: (view)=>
		$("#content-stream-table").prepend(view.render().el).masonry( 'reload' )

	injectWikipage: (wikipage)=>
		wikipageView = new WikiPageView	model: wikipage
		@injectView wikipageView

	injectQuestion: (question)=>
		questionView = new QuestionView	model: question
		@injectView questionView

	injectLink: (link)=>
		linkView = new LinkView	model: link
		@injectView linkView

	addWikipage: (wikipage)=>
		wikipage.save(null,
			success: (wikipage)=> @wikipages.add wikipage
		)

	addQuestion: (question)=>
		@questions.add question

	addLink: (link)=>
		@links.add link

