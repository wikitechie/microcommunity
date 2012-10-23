define [
	'jquery'
	'backbone'
	'text!templates/comment.html'
	'jquery.gravatar'
	'general'
	'moment'
], ($, Backbone, comment_template) ->
	class CommentView extends Backbone.View

		template: _.template(comment_template)
		
		className: "comment"

		initialize: ->
			_.bindAll @

		render: ->
			$(@el).html @template @model.toJSON()
			@

