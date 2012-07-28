define [
	'backbone'
	'cs!models/comment'
], (Backbone, Comment) ->
	class Comments extends Backbone.Collection
		model: Comment
		url: '/api/posts'

