define [
	'backbone'
], (Backbone, User) ->
	class VoteState extends Backbone.Model
		defaults :
			up_voted   : false
			down_voted : false
