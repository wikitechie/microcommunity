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

	saveButton: ->
		console.debug "saving..."
		@model.set {body: $("#wikipage-body").val()}

		@template = @normalTemplate
		@render()

	cancelButton: ->
		@template = @normalTemplate
		@render()


class window.ContentStream extends Backbone.View

	el: '#content-stream'
	template: _.template($('#content-stream-template').html()),

	initialize: ->
		_.bindAll @

		@wikipages = new WikiPages
		@wikipages.bind 'add', @injectWikipage

		@render()

		wikipage = new WikiPage()
		wikipage.set {title: "Backbone", body: "Backbone is really cool"}
		@addWikipage wikipage

		wikipage = new WikiPage()
		wikipage.set {title: "Backbone", body: "Backbone is really cool"}
		@addWikipage wikipage

	render: ->
		$(@el).html @template
		return this

	injectWikipage: (wikipage)=>
		wikiPageView = new WikiPageView	model: wikipage
		$("#content-stream-table").prepend wikiPageView.render().el

	addWikipage: (wikipage)=>
		@wikipages.add wikipage
		console.debug("added a wikipage #{wikipage}")

