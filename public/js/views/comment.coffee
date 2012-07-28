define [
	'jquery'
	'backbone'
	'jquery.gravatar'
	'general'
	'moment'
], ($, Backbone) ->
	class CommentView extends Backbone.View

		template: _.template($('#comment-template').html()),

		initialize: ->
			_.bindAll @

		render: ->
			$(@el).html @template @model.attributes
			@

