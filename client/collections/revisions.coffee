define [
	'backbone'
	'cs!models/revision'
], (Backbone, Revision) ->
	class Revision extends Backbone.Collection
		model: WikiPage

