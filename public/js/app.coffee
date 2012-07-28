window.AppRouter = Backbone.Router.extend
	routes:
		"" : "default"


	default: ->
		
		console.debug "default router"
		window.current_user = eval(user)
		
		if current_user?
			#publisher = new window.PublisherContainer()	
		
		#socialStream = new window.ActivityStream()		


jQuery ->
	appRouter = new AppRouter()
	Backbone.history.start()

