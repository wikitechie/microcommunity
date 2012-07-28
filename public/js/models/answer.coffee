define [
	'backbone'
], (Backbone) ->
	class Answer extends Backbone.Model
		defaults:
			name: "Amjad"
			text: "Try doing so and so!"
			votes: 0

		idAttribute: "_id"

