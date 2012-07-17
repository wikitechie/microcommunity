class window.WikiPage extends Backbone.Model
	defaults:
		title: "Backbone.js"
		body: "Backbone.js is a MVC javascript framework for the client side."

	idAttribute: "_id"
	url: '/api/wikipages/'

	initialize: ->
		@comments = new Comments

class window.WikiPages extends Backbone.Collection
	model: window.WikiPage
	url: '/api/wikipages'

