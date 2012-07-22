class window.Activity extends Backbone.Model
	defaults:
		actor: "Actor"
		verb: "verbed"
		object: "Object"
		target: "Target"
		created_at : Date()

	idAttribute: "_id"

	url: ->
		"/api/activity/"

	initialize: (options)->
		#@comments = new Comments
		
		@post = new Post
		if options?
			#@comments.add options.comments
			@wikipage = options.wikipage


class window.Activities extends Backbone.Collection
	model: window.Activity
	url: '/api/activities/'

