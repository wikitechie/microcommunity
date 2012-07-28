define [
	'backbone'
	'cs!collections/comments'
], (Backbone, Comments) ->
	class Post extends Backbone.Model
		defaults:
			name: "Amjad"
			text: "Newly posted, Hello, Backbone"
			created_at: Date()

		idAttribute: "_id"

		url: ->
			"/api/posts/"

		initialize: (options)->
			@comments = new Comments
			if options?
				if options.comments.length > 0
					@comments.add options.comments
