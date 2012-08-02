define [
	'backbone'
	'cs!models/comment'
	'cs!models/user'
	'backbone-relational'
], (Backbone, Comment, User) ->
	class Post extends Backbone.RelationalModel
		idAttribute: "_id"
		
		relations : [
			{	type : Backbone.HasOne,	key : "user",	relatedModel : User	}
			{	type : Backbone.HasMany, key : "comments",	relatedModel : Comment	}
		]
		
		validate : (attrs)->
			unless attrs.text?
				return "a Post should have a text"
			unless attrs.user?
				return "a Post should have a user"				

		urlRoot: "/api/posts"

		initialize: ()->
			@get('comments').url = "/api/posts/#{@id}/comments"
		
			#@comments = new Comments
			#if options? and options.comments? 
				#if options.comments.length > 0
					#@comments.add options.comments
