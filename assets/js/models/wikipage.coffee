class window.WikiPage extends Backbone.Model
	defaults:
		title: "Amjad"
		body: "Hello, Backbone"

	idAttribute: "_id"

class window.WikiPages extends Backbone.Collection
	model: window.Wikipage
	url: '/api/wikipages'

