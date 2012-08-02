define [
	'backbone'
	'cs!collections/comments'
	'backbone-relational'
], (Backbone, Comments) ->
	class Post extends Backbone.RelationalModel
		defaults:
			created_at: Date()

		idAttribute: "_id"
		
		validate : (attrs)->
			unless attrs.text?
				return "a Post should have a text"
			unless attrs.user?
				return "a Post should have a user"				

		urlRoot: ->
			"/api/posts"

		initialize: (options)->
			@comments = new Comments
			if options? and options.comments? 
				if options.comments.length > 0
					@comments.add options.comments
