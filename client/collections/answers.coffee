define [
	'backbone'
	'cs!models/answer'
], (Backbone, Answer) ->
	class Answers extends Backbone.Collection
		model: Answer
		url: '/api/answers'
