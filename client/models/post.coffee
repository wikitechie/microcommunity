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
			if attributes.parent.objectType?
				if (attributes.parent.objectType is 'user')
					parent_model = User
				else
					parent_model = Group

				@relations[2] = 
					type : Backbone.HasOne
					key : "parent"
					relatedModel : parent_model	
					includeInJSON : ['_id', 'objectType']		
									
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)	
		
		relations : [
			{	type : Backbone.HasOne,	key : "author", relatedModel : User, includeInJSON : '_id'	}
			{	type : Backbone.HasMany, key : "comments", relatedModel : Comment	}
		]				

		urlRoot: "/api/posts"

		initialize: ()->
			@get('comments').url = ()=>
				url = @url()
				"#{url}/comments"

