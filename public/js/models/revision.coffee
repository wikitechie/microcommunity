define [
	'backbone'
	'cs!models/user'
	'cs!models/comment'	
	'cs!models/wikipage'
], (Backbone, User, Comment, WikiPage) ->
	class Revision extends Backbone.RelationalModel
	
		idAttribute: "_id"
		
		relations : [
			{	type : Backbone.HasOne,	key : "page",	relatedModel : WikiPage	}
			{	type : Backbone.HasMany,	key : "comments",	relatedModel : Comment	}
			{	type : Backbone.HasOne,	key : "user",	relatedModel : User	}			
		]		
		
		
		urlRoot : '/api/revisions'

		initialize: ()->
			@get('comments').url = "/api/revisions/#{@id}/comments"



