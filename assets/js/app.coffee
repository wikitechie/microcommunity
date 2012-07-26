#= require_tree lib
#= require basic
#= require mediator
#= require publisher
#= require activity_stream

window.AppRouter = Backbone.Router.extend
	routes:
		"content/:id" : "embededContent"
		"*other" : "default"

	embededContent: (id)->
		publisher = new window.PublisherContainer()
		socialStream = new window.ActivityStream()

	default: ->
		
		window.current_user = eval(user)
		
		if current_user?
			publisher = new window.PublisherContainer()	
		
		socialStream = new window.ActivityStream()		


jQuery ->
	appRouter = new AppRouter()
	Backbone.history.start()

