class window.SocialStream extends Backbone.View

	el: '#social-stream'
	template: _.template($('#social-stream-template').html()),

	initialize: ->
		_.bindAll @

		@posts = new Posts
		@wikipages = new WikiPages
		@posts.bind 'add', @injectPost
		@wikipages.bind 'add', @injectWikipage

		window.mediator.bind "new post", (post)=>
		  @addPost post

		window.mediator.bind "new wikipage", (wikipage)=>
		  @addWikipage wikipage

		@render()

		wikipage = new WikiPage
		wikipage.set	{title: "Node.js",	body: "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."}

		wikipageView = new WikiPageView	model: wikipage
		@injectView wikipageView

		link = new Link
		linkView = new LinkView	model: link
		@injectView linkView

		link = new Link
		link.set
			title: "Confirmed: US and Israel created Stuxnet, lost control of it | Ars Technica "
			url: "http://arstechnica.com/tech-policy/2012/06/confirmed-us-israel-created-stuxnet-lost-control-of-it/"
			preview_thumbnail: "http://img.scoop.it/Zux1dLahsC0OGeb4LxUI1zl72eJkfbmt4t8yenImKBVaiQDB_Rd1H6kmuBWtceBJ"
			preview: "http://img.scoop.it/Zux1dLahsC0OGeb4LxUI1zl72eJkfbmt4t8yenImKBVaiQDB_Rd1H6kmuBWtceBJ"
			curation: "In 2011, the US government rolled out its International Strategy for Cyberspace, which reminded us that interconnected networks link nations more closely, so an attack on one nation’s networks may have impact far beyond its borders. An in-depth report today from the New York Times confirms the truth of that statement as it finally lays bare the history and development of the Stuxnet virus—and how it accidentally escaped from the Iranian nuclear facility that was its target."

		linkView = new LinkView	model: link
		linkView.setTemplate "thumb"

		@injectView linkView


	render: ->
		$(@el).html @template { posts : [{name: "Amjad", text: "Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone Hello, Backbone "}, {name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"},{name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}] }
		@

	injectPost: (post)=>
		postView = new PostView	model: post
		$("#social-stream-table").prepend(postView.render().el).masonry( 'reload' )

	injectWikipage: (wikipage)=>
		wikipageView = new WikiPageView	model: wikipage
		$("#social-stream-table").prepend(wikipageView.render().el).masonry( 'reload' )

	injectView: (view)=>
		$("#social-stream-table").prepend(view.render().el).masonry( 'reload' )

	addPost: (post)=>
		@posts.add post

	addWikipage: (wikipage)=>
		@wikipages.add wikipage

