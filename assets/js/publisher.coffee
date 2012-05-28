class window.Publisher extends Backbone.View

	el: '#publisher'
	button : '#post-button'
	template: _.template($('#publisher-template').html()),

	events:
  	'click #publisher-text': 'expand'
  	'click #post-button' : 'post'

	initialize: ->
		@render()

	render: ->
		$(@el).html @template
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

