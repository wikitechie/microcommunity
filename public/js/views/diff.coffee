define [
	'jquery'
	'backbone'
	'text!templates/diff.html'
], ($, Backbone, template) ->
	class DiffView extends Backbone.View
		className: "diff"
		template: _.template(template)
	
		events:
			'click .toggle-diff': 'toggleDiff'
		
		initialize: ->
			_.bindAll @

		render: ->	

			$(@el).html @template @model.attributes
			@

		toggleDiff : ->
			$(@el).find('.diff-content').slideToggle()
