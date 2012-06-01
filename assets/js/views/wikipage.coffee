class window.WikiPageView extends Backbone.View

	normalTemplate: _.template($('#wikipage-template').html())
	editTemplate: _.template($('#wikipage-edit-template').html())

	events:
		"click #edit-button": "editButton"
		"click #cancel-button": "cancelButton"
		"click #save-button": "saveButton"

	initialize: ->
		_.bindAll @
		@template = @normalTemplate

	render: ->
		$(@el).html @template @model.attributes
		@

	editButton: ->
		console.debug "editing..."
		@template = @editTemplate
		@render()
		$('#social-stream-table').masonry( 'reload' )

	saveButton: ->
		console.debug "saving..."
		@model.set {body: $("#wikipage-body").val()}

		@template = @normalTemplate
		@render()
		$('#social-stream-table').masonry( 'reload' )

	cancelButton: ->
		@template = @normalTemplate
		@render()
		$('#social-stream-table').masonry( 'reload' )

