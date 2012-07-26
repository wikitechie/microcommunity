class window.DiffView extends Backbone.View
	className: "diff"
	template: _.template($('#diff-template').html())
	
	events:
		'click .toggle-diff': 'toggleDiff'
		
	initialize: ->
		_.bindAll @

	render: ->	
		$(@el).html @template @model.attributes
		@

	toggleDiff : ->
		$(@el).find('.diff-content').slideToggle()
