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


class window.SocialStream extends Backbone.View

	el: '#social-stream'
	template: _.template($('#social-stream-template').html()),

	initialize: ->
		_.bindAll @

		@posts = new Posts
		@posts.bind 'add', @injectPost

		@render()

		window.mediator.bind "new post", (post)=>
		  @addPost post



	render: ->
		$(@el).html @template { posts : [{name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}] }
		return this

	injectPost: (post)=>
		postView = new PostView	model: post
		$("#social-stream-table").prepend postView.render().el

	addPost: (post)=>
		@posts.add post

