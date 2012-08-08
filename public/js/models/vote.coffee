define [
	'backbone'
	'cs!models/user'
	'backbone-relational'
], (Backbone, User) ->
	class Vote extends Backbone.RelationalModel
			
		idAttribute: "_id"		
		
		relations : [
			{	type : Backbone.HasOne,	key : "user",	relatedModel : User	}
		]

