define [
	'backbone'
], (Backbone) ->
	class Question extends Backbone.Model
		defaults:
			title: "What is MicroCommunity?"
			body: "I was wondering about this new social network, what is it exactly?"
			name: "Amjad"

		idAttribute: "_id"

