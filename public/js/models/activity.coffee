define [
	'backbone'
	'cs!models/user'
	'cs!models/post'
	'cs!models/wikipage'
	'cs!models/revision'
	'cs!models/group'	
	'backbone-relational'
], (Backbone, User, Post, WikiPage, Revision, Group) ->
	class Activity extends Backbone.RelationalModel
		idAttribute: "_id"
		
		
		# this is some sort of a hook that is called before the
		# call of the RelationalModel constructor, in order to push
		# the proper relation depending on the right object_type in the
		# JSON object passed to it	
		constructor: (attributes, options)->	
			model_classes = 
				Post: Post
				Revision : Revision						
			
			if attributes.object_type?

				@relations[1] = 
					type : Backbone.HasOne
					key : "object"
					relatedModel : model_classes[attributes.object_type]

			if attributes.target_type?
				if (attributes.target_type == 'users')
					target_model = User
				else
					target_model = Group

				@relations[2] = 
					type : Backbone.HasOne
					key : "target"
					relatedModel : target_model
					
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)
		
		relations : [
			{	type : Backbone.HasOne,	key : "actor",	relatedModel : User	}
		]

		url: ->
			"/api/activities/"
			
		message : ()->
			"Custom message"



