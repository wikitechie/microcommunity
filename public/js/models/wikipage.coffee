define [
	'backbone'
	'cs!collections/comments'
], (Backbone, Comments) ->
	class WikiPage extends Backbone.Model
		defaults:
			title: "Backbone.js"
			body: "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface."

		idAttribute: "_id"
		url: '/api/wikipages/'

		initialize: ->
			@comments = new Comments


