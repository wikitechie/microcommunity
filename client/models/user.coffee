define [
	'backbone'
	'backbone-relational'
], (Backbone) ->
	class User extends Backbone.RelationalModel
		idAttribute: "_id"		
		urlRoot: "/api/users"
		
		initialize: ()->
			@set('objectType', 'User')
