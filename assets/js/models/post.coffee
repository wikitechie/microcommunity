class window.Post extends Backbone.Model
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
			
class window.Posts extends Backbone.Collection
	backend: 'posts'
	model: window.Post
	url: '/api/posts'

