define [
	'backbone'
	'cs!models/activity'
], (Backbone, Activity) ->
	class Activities extends Backbone.Collection
		model: Activity
		url: '/api/activities/'

