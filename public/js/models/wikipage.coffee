define [
	'backbone'
	'cs!collections/comments'
], (Backbone, Comments) ->
	class WikiPage extends Backbone.Model
		defaults:
			title: "Backbone.js"

		idAttribute: "_id"
		url: '/api/wikipages/'

		initialize: ->
			@comments = new Comments


