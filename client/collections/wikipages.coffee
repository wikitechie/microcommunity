define [
	'backbone'
	'cs!models/wikipage'
], (Backbone, WikiPage) ->
	class WikiPages extends Backbone.Collection
		model: WikiPage
		url: '/api/wikipages'

