class window.Activity extends Backbone.Model
	defaults:
		verb: "create"
		created_at : Date()

	idAttribute: "_id"

	url: ->
		"/api/activity/"

	initialize: (options)->
		#@comments = new Comments
		
		@post = new Post
		if options?
			#@comments.add options.comments
			@object = options.object
			@actor = options.actor
			

class window.Activities extends Backbone.Collection
	model: window.Activity
	url: '/api/activities/'

