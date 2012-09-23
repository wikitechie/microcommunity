define [
	'backbone'
	'cs!models/comment'
	'cs!models/user'
	'cs!models/group'
	'backbone-relational'
], (Backbone, Comment, User, Group) ->
	class Post extends Backbone.RelationalModel
		idAttribute: "_id"
		
		constructor : (attributes, options)->
			if attributes.parent_type?
				if (attributes.parent_type is 'users')
					parent_model = User
				else
					parent_model = Group

				@relations[2] = 
					type : Backbone.HasOne
					key : "parent"
					relatedModel : parent_model		
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)	
		
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
