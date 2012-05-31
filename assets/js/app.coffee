#= require mediator
#= require publisher
#= require social_stream


jQuery ->
	publisher = new window.Publisher()
	socialStream = new window.SocialStream()
	#contentStream = new window.ContentStream()
	$('#social-stream-table').masonry
		 itemSelector : '.well'
		 isAnimated: true

