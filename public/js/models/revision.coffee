define [
	'backbone'
	'cs!collections/comments'
	'cs!models/wikipage'
], (Backbone, Comments, WikiPage) ->
	class Revision extends Backbone.RelationalModel
	
		idAttribute: "_id"
		
		relations : [
			{	type : Backbone.HasOne,	key : "page",	relatedModel : WikiPage	}
		]		

		initialize: (options)->
			@comments = new Comments



