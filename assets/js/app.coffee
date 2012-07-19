#= require lib/general
#= require basic
#= require mediator
#= require publisher
#= require social_stream

window.AppRouter = Backbone.Router.extend
	routes:
		"content/:id" : "embededContent"
		"*other" : "default"

	embededContent: (id)->
		publisher = new window.PublisherContainer()
		socialStream = new window.SocialStream()

	default: ->
		
		window.current_user = eval(user)
		
		console.debug(current_user)
		
		if current_user?
			publisher = new window.PublisherContainer()

		socialStream = new window.SocialStream()		

jQuery ->
	appRouter = new AppRouter()
	Backbone.history.start()

