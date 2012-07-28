define [
	'backbone'
	'cs!models/post'
], (Backbone, Post) ->
	class Posts extends Backbone.Collection
		backend: 'posts'
		model: Post
		url: '/api/posts'
