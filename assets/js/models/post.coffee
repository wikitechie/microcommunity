class window.Post extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Hello, Backbone"

	idAttribute: "_id"


class window.Posts extends Backbone.Collection
	model: window.Post
	url: '/api/posts'

