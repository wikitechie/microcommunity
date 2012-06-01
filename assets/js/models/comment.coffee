class window.Comment extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Hehe! Great idea!"

	idAttribute: "_id"


class window.Comments extends Backbone.Collection
	model: window.Comment
	url: '/api/posts'

