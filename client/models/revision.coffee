define [
	'backbone'
	'cs!models/user'
	'cs!models/comment'	
	'cs!models/wikipage'
	'cs!models/vote'	
], (Backbone, User, Comment, WikiPage, Vote) ->
	class Revision extends Backbone.RelationalModel
	
		idAttribute: "_id"
		
		relations : [
			{	type : Backbone.HasOne,	key : "page",	relatedModel : WikiPage	}
			{	type : Backbone.HasMany,	key : "comments",	relatedModel : Comment	}
			{	type : Backbone.HasMany,	key : "up_votes",	relatedModel : Vote, reverseRelation : {key: 'voted_object'}	}
			{	type : Backbone.HasMany,	key : "down_votes",	relatedModel : Vote, reverseRelation : {key: 'voted_object'}	}									
			{	type : Backbone.HasOne,	key : "user",	relatedModel : User	}			
		]	
		
		urlRoot : '/api/revisions'

		initialize: ()->
			@get('comments').url = "/api/revisions/#{@id}/comments"
			@get('up_votes').url = "/api/revisions/#{@id}/votes"
			@set('type','Revision')			



