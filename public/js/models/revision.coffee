define [
	'backbone'
	'cs!collections/comments'
	'cs!models/wikipage'
], (Backbone, Comments, WikiPage) ->
	class Revision extends Backbone.Model
		defaults:
			body: "Some body"
			page:
				title : "Title"

		idAttribute: "_id"

		initialize: (options)->
			@comments = new Comments
			@page = new WikiPage options.page



