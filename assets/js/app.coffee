#= require mediator
#= require publisher
#= require social_stream
#= require content_stream

jQuery ->
	publisher = new window.Publisher()
	socialStream = new window.SocialStream()
	contentStream = new window.ContentStream()

