define [
	'backbone'
	'cs!models/user'
	'cs!models/group'
	'cs!collections/comments'
], (Backbone, User, Group, Comments) ->
	class WikiPage extends Backbone.RelationalModel

		constructor : (attributes, options)->
			if attributes.parent.objectType?
				if (attributes.parent.objectType is 'user')
					parent_model = User
				else
					parent_model = Group					

				@relations[0] = 
					type : Backbone.HasOne
					key : "parent"
					relatedModel : parent_model
					includeInJSON : ['_id', 'objectType']
							
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)	
			
		relations : []	

		idAttribute: "_id"
		url: '/api/wikipages/'
	
		initialize: ->
			@comments = new Comments
			@set('type','WikiPage')


