define [
	'jquery'
	'backbone'
	'underscore'
	'cs!models/user'
	'backbone-relational'
], ($, Backbone, _, User) ->
	class Vote extends Backbone.RelationalModel
				
		relations : [
			{	type : Backbone.HasOne,	key : "user",	relatedModel : User	}
		]
		
		destroy : (options) ->
			params = 
				url   : @url + "/" + @get('user').id
				type  : "DELETE"
			$.ajax _.extend params, options



