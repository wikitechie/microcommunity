define [
	'backbone'
	'cs!models/comment'
	'cs!models/wikipage'
], (Backbone, Comment, WikiPage) ->
	class Revision extends Backbone.RelationalModel
	
		idAttribute: "_id"
		
		relations : [
			{	type : Backbone.HasOne,	key : "page",	relatedModel : WikiPage	}
			{	type : Backbone.HasMany,	key : "comments",	relatedModel : Comment	}
		]		

		initialize: ()->
			@get('comments').each (comment) ->
				comment.url = "/api/revisions/#{@id}/comments"



