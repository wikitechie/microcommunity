define [
	'backbone'
], (Backbone) ->
	class Diff extends Backbone.Model
		defaults:
			summary : ""
			diff: []

		initialize:->

