define [
	'jquery'
	'backbone'
	'text!templates/vote_controls.html'
], ($, Backbone,template) ->
	class VoteControls extends Backbone.View
		className: "vote-controls"
		template: _.template(template)

		initialize: ->


		render: ->	
			$(@el).html @template()
			@

					
