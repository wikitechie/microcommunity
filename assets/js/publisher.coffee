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


class window.PublisherContainer extends Backbone.View

	el: '#publisher'
	template: _.template($('#publisher-container-template').html()),

	initialize: ->
		@render()
		@addPublisher "post", "Post", new PostPublisher
		@addPublisher "wikipage", "Wiki", new WikipagePublisher
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

