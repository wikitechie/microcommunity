class window.WikiPage extends Backbone.Model
	defaults:
		title: "Amjad"
		body: "Hello, Backbone"

	idAttribute: "_id"
	url: '/api/wikipages/'

	initialize: ->
		@comments = new Comments

class window.WikiPages extends Backbone.Collection
	model: window.WikiPage
	url: '/api/wikipages'

