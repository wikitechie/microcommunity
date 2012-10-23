define [
	'backbone'
	'cs!models/question'
], (Backbone, Activity) ->
	class Questions extends Backbone.Collection
		model: Question
		url: '/api/questions'

