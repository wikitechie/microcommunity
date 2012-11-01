define [
	'backbone'
	'backbone-relational'
], (Backbone) ->
	class Group extends Backbone.RelationalModel
		idAttribute: "_id"		
		urlRoot: "/api/groups"
	
		initialize: ()->
			@set('objectType', 'Group')		
