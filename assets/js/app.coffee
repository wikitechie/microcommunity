#= require lib/general
#= require basic
#= require mediator
#= require publisher
#= require social_stream
#= require content_stream
#= require embeded_content

window.AppRouter = Backbone.Router.extend
	routes:
		"content/:id" : "embededContent"
		"*other" : "default"

	embededContent: (id)->
		publisher = new window.PublisherContainer()
		socialStream = new window.SocialStream()
		embededContent = new window.EmbededContent()

	default: ->
		publisher = new window.PublisherContainer()
		socialStream = new window.SocialStream()
		contentStream = new window.ContentStream()

jQuery ->

	appRouter = new AppRouter()
	Backbone.history.start()

