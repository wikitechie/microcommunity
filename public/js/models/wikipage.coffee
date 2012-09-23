define [
	'backbone'
	'cs!models/user'
	'cs!models/group'
	'cs!collections/comments'
], (Backbone, User, Group, Comments) ->
	class WikiPage extends Backbone.RelationalModel
		defaults:
			title: "Backbone.js"

		constructor : (attributes, options)->
			console.debug attributes
			if attributes.parent_type?
				if (attributes.parent_type is 'users')
					parent_model = User
				else
					parent_model = Group
					

				@relations[0] = 
					type : Backbone.HasOne
					key : "parent"
					relatedModel : parent_model		
			Backbone.RelationalModel.prototype.constructor.apply(this, arguments)	
			
		relations : []	

		idAttribute: "_id"
		url: '/api/wikipages/'
	
		initialize: ->
			@comments = new Comments


