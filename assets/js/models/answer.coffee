class window.Answer extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Try doing so and so!"
		votes: 0

	idAttribute: "_id"


class window.Answers extends Backbone.Collection
	model: window.Answer
	url: '/api/answers'

