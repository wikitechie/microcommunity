class window.Publisher extends Backbone.View

	el: '#publisher'
	button : '#post-button'
	template: _.template($('#publisher-template').html()),

	events: 'click #group-publisher-text': 'expand'

	initialize: ->
		@render()

		$('.new_post').bind 'ajax:beforeSend', (event) =>
			@disable()

		$('.new_post').bind 'ajax:complete', (event) =>
			@enable()

	render: ->
		$(@el).html @template
		return this

	disable: ->
		$("#group-publisher-text").attr("disabled","disabled")
		$(@button).attr("disabled","disabled")
		$(@el).spin()

	enable: ->
		$("#group-publisher-text").removeAttr("disabled")
		$("#group-publisher-text").val('')
		$(@button).removeAttr("disabled")
		$(@el).spin(false)

	expand: ->
		$("#group-publisher-text").attr("rows","3")

