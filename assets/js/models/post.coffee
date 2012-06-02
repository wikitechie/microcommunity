class window.Post extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Newly posted, Hello, Backbone"

	idAttribute: "_id"

	url: ->
		"/api/posts/#{@id}"


class window.Posts extends Backbone.Collection
	model: window.Post
	url: '/api/posts'

