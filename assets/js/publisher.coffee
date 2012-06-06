class window.PostPublisher extends Backbone.View

	button : '#post-button'
	template: _.template($('#post-publisher-template').html()),

	events:
  	'click #publisher-text': 'expand'
  	'click #post-button' : 'newpost'

	initialize: ->
		@render()

	render: ->
		$(@el).html @template
		@

	disable: ->
		$("#publisher-text").attr("disabled","disabled")
		$(@button).attr("disabled","disabled")
		$(@el).spin()

	enable: ->
		$("#publisher-text").removeAttr("disabled")
		$("#publisher-text").val('')
		$(@button).removeAttr("disabled")
		$(@el).spin(false)

	expand: ->
		$("#publisher-text").attr("rows","3")

	reset: ->
		$("#publisher-text").val("")
		$("#publisher-text").attr("rows","1")

	newpost: ->
		post = new Post {name: "Guest",	text: $("#publisher-text").val(), comments: []}
		window.mediator.trigger("new-post", post)
		@reset()

class window.WikipagePublisher extends Backbone.View

	button : '#wikipage-button'
	template: _.template($('#wikipage-publisher-template').html()),

	events:
  	'click #wikipage-text': 'expand'
  	'click #wikipage-button': 'post'

	initialize: ->
		@render()

	render: ->
		$(@el).html @template
		return this

	disable: ->
		$("#wikipage-text").attr("disabled","disabled")
		$(@button).attr("disabled","disabled")
		$(@el).spin()

	enable: ->
		$("#wikipage-text").removeAttr("disabled")
		$("#wikipage-text").val('')
		$(@button).removeAttr("disabled")
		$(@el).spin(false)

	reset: ->
		$("#wikipage-text").val("")
		$("#wikipage-text").attr("rows","1")
		$("#wikipage-title").val("")

	expand: ->
		$("#wikipage-text").attr("rows","3")

	post: ->
		wikipage = new WikiPage
		wikipage.set	{title: $("#wikipage-title").val(),	body: $("#wikipage-text").val()}
		window.mediator.trigger("new-wikipage", wikipage)
		@reset()

class window.QuestionPublisher extends Backbone.View

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


class window.LinkPublisher extends Backbone.View

	button : '#link-button'
	template: _.template($('#link-publisher-template').html()),

	events:
  	'click #link-text': 'expand'
  	'click #link-button': 'post'

	initialize: ->
		@render()

	render: ->
		$(@el).html @template
		return this

	disable: ->
		$("#link-text").attr("disabled","disabled")
		$(@button).attr("disabled","disabled")
		$(@el).spin()

	enable: ->
		$("#link-text").removeAttr("disabled")
		$("#link-text").val('')
		$(@button).removeAttr("disabled")
		$(@el).spin(false)

	reset: ->
		$("#link-text").val("")
		$("#link-title").val("")
		$("#link-url").val("")
		$("#link-image").val("")
		$("#link-text").attr("rows","1")
		$("#link-title").val("")

	expand: ->
		$("#question-link").attr("rows","3")

	post: ->
		link = new Link
		link.set
			name: "Guest"
			title: $("#link-title").val()
			url: $("#link-url").val()
			preview: $("#link-image").val()
			curation: $("#link-text").val()

		window.mediator.trigger("new-link", link)
		@reset()




class window.PublisherContainer extends Backbone.View

	el: '#publisher'
	template: _.template($('#publisher-container-template').html()),

	initialize: ->
		@render()
		@addPublisher "post", "Post", new PostPublisher
		@addPublisher "wikipage", "Wiki", new WikipagePublisher
		@addPublisher "question", "Question", new QuestionPublisher
		@addPublisher "link", "Link", new LinkPublisher

		$('#publisher-tab a').click (e) ->
			e.preventDefault();
			$(this).tab('show')
		$('#publisher-tab a:first').tab('show');


	addPublisher: (identifier, label, view)->
		$("#publisher-tab").append("<li><a href='##{identifier}'>#{label}</a></li>")
		element = $("<div class='tab-pane' id='#{identifier}'></div>").append view.render().el
		$("#publisher-content").append element


	render: ->
		$(@el).html @template
		@

