class window.EmbededContent extends Backbone.View

	el: '#content-deck'
	template: _.template($('#embeded-content-template').html()),

	initialize: ->
		_.bindAll @
		@wikipage = new WikiPage
		@wikipage.set	{title: "Node.js",	body: "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."}

		@render()


	render: ->
		$(@el).html @template
		wikipageView = new WikiPageView	model: @wikipage, embeded: true
		embeded = wikipageView.render().el
		#embeded.addClass "embeded"
		$(@el).find("#content").prepend embeded
		@

