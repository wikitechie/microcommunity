class window.Post extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Newly posted, Hello, Backbone"

	idAttribute: "_id"

	url: ->
		"/api/posts/#{@id}"

	initialize: (options)->
		console.debug options
		@comments = new Comments
		@comments.add options.comments


class window.Posts extends Backbone.Collection
	model: window.Post
	url: '/api/posts'

