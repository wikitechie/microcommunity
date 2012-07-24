class window.ActivityStream extends Backbone.View
	el: '#social-stream'
	template: _.template($('#activity-stream-template').html())
	
	initialize: ->
    _.bindAll @
    #initializing models collections
    @posts = new Posts    
    @wikipages = new WikiPages    
    @questions = new Questions    
    @links = new Links
        
    @activities = new Activities
    @activities.bind 'add', @injectActivity
                    
    #bindings publisher events to the stream
    window.mediator.bind "new-post", (post)=>
      @addPost post  
    window.mediator.bind "new-wikipage", (wikipage)=>
      @addWikipage wikipage
    window.mediator.bind "new-question", (question)=>
      @addQuestion question
    window.mediator.bind "new-link", (link)=>
      @addLink link
    window.mediator.bind "new-activity", (activity)=>
      @addActivity activity    
      

    @render()

    #initializing posts rendered from the server
    @activities.add eval(activities)
    
                    
    wikipage = new WikiPage
    wikipageView = new WikiPageView        model: wikipage
    #@injectView wikipageView
    
    post = @posts.last()
    
    activity = new Activity
		  actor : current_user
		  object: wikipage
		  verb: "edit"
                            
    #activityView = new ActivityView        model: activity
    #@injectView activityView
          

  render: ->
  	$(@el).html @template posts: JSON.stringify(@posts)
  	@
          
  #injecting views
   
  injectActivity: (activity)=>
  	activityView = new ActivityView model: activity
  	@injectView activityView
    
  injectView: (view)=>
    $("#activity-stream-table").prepend(view.render().el)
          
  #adding new models to the collections
  
  addPost: (post)=>        
    post.save(null,
		  success: (post)=>
		  	@posts.add post
		  	activity = new Activity
		  		actor : current_user
		  		object: post
		  		object_type: "Post"
		  		verb: "create"
	  		@addActivity activity
  		)
	          
  addWikipage: (wikipage)=>
    wikipage.save(null,
		  success: (wikipage, response)=> 
		  	@wikipages.add wikipage
		  	activity = new Activity
		  		actor : current_user
		  		object: wikipage
		  		object_type: "WikiPage"
		  		verb: "create"
	  		@addActivity activity
  		)


  addQuestion: (question)=>
    @questions.add question

  addLink: (link)=>
    @links.add link
    
  addActivity:(activity)=>
  	activity.save(null,
  		success: (activity)=> 
  			@activities.add activity  			
  		)

