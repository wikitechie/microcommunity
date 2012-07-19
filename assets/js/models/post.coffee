class window.Post extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Newly posted, Hello, Backbone"

	idAttribute: "_id"

	url: ->
		"/api/posts/"

	initialize: (options)->
		@comments = new Comments
		if options?
			@comments.add options.comments
			
		if @get('user')?
			@user = @get('user')
			console.debug "user id #{@get('user')}"


class window.Posts extends Backbone.Collection
	model: window.Post
	url: '/api/posts'

