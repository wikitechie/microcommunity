define [
	'backbone'
	'cs!collections/comments'
], (Backbone, Comments) ->
	class WikiPage extends Backbone.RelationalModel
		defaults:
			title: "Backbone.js"

		idAttribute: "_id"
		url: '/api/wikipages/'

		initialize: ->
			@comments = new Comments


