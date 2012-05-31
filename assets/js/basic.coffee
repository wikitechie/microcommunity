class window.Post extends Backbone.Model
	defaults:
		name: "Amjad"
		text: "Hello, Backbone"

	idAttribute: "_id",

class window.Posts extends Backbone.Collection
	model: window.Post
	url: '/api/posts'

class window.PostView extends Backbone.View
	tagName: "tr"

	template: _.template($('#post-template').html()),

	initialize: ->
		_.bindAll @

	render: ->
		$(@el).html @template @model.attributes

		@

class window.WikiPage extends Backbone.Model
	defaults:
		title: "Amjad"
		body: "Hello, Backbone"

	idAttribute: "_id",

class window.WikiPages extends Backbone.Collection
	model: window.Wikipage
	url: '/api/wikipages'

class window.WikiPageView extends Backbone.View
	tagName: "tr"

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
		@toggleTemplate
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

