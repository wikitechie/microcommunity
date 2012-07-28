define [
	'backbone'
], (Backbone) ->
	class Comment extends Backbone.Model
		defaults:

			text: "Hehe! Great idea!"

		idAttribute: "_id"
	
		initialize : ()-> 
			@url = 	'api/posts/12/comments/'
	


