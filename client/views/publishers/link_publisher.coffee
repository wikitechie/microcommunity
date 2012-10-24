define [
	'jquery'
	'backbone'
	'cs!models/link'
	'cs!models/activity'
	'jquery.spin'
], ($, Backbone, Link, Activity)->
	class LinkPublisher extends Backbone.View

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
			destination = $("#content-deck").offset().top;
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-40}, 500 );

