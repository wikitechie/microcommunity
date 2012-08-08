define [
	'jquery'
	'backbone'
	'text!templates/post_summary.html'
], ($, Backbone,template) ->
	class PostSummary extends Backbone.View
		className: "post-summary"
		template: _.template(template)
		
		render: ->	
			$(@el).html @template @model.toJSON()
			@

