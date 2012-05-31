class window.Publisher extends Backbone.View

	el: '#publisher'
	button : '#post-button'
	template: _.template($('#publisher-template').html()),

	events:
  	'click textarea': 'expand'
  	'click #post-button' : 'post'
  	'click #wikipage-button' : 'post'

	initialize: ->
		@render()

	render: ->
		$(@el).html @template
		$('#publisher-tab a').click (e) ->
			e.preventDefault();
			$(this).tab('show')

		return this

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

	post: ->
		post = new Post
		post.set	{name: "Guest",	text: $("#publisher-text").val()}
		window.mediator.trigger("new post", post);

