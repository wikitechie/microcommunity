define [
	'backbone'
	'cs!models/link'
], (Backbone, Link) ->
	class Links extends Backbone.Collection
		model: Link
		url: '/api/posts'

