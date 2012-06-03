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

		$('#social-stream-table').masonry
			 itemSelector : '.well'
			 isAnimated: true


	render: ->
		$(@el).html @template posts: JSON.stringify(@posts)
		@

	injectPost: (post)=>
		postView = new PostView	model: post
		$("#social-stream-table").prepend(postView.render().el).masonry( 'reload' )

	injectView: (view)=>
		$("#social-stream-table").prepend(view.render().el).masonry( 'reload' )

	addPost: (post)=>
		@posts.add post

