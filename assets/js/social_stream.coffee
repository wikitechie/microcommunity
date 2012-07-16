class window.SocialStream extends Backbone.View

	el: '#social-stream'
	template: _.template($('#social-stream-template').html()),

	initialize: ->
		_.bindAll @

		@posts = new Posts
		@posts.bind 'add', @injectPost

		window.mediator.bind "new-post", (post)=>
		  @addPost post

		@render()

		#initializing posts rendered from the server
		@posts.add eval(posts)

	render: ->
		$(@el).html @template posts: JSON.stringify(@posts)
		@

	injectPost: (post)=>
		postView = new PostView	model: post
		$("#social-stream-table").prepend(postView.render().el)

	injectView: (view)=>
		$("#social-stream-table").prepend(view.render().el)

	addPost: (post)=>
		post.save(null,
			success: (post)=> @posts.add post
		)

