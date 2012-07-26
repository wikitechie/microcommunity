class window.ActivityStream extends Backbone.View
	el: '#social-stream'
	template: _.template($('#activity-stream-template').html())
	
	events:
		'click #load-more' : 'loadMore'
	
	initialize: ->
    _.bindAll @
    #initializing models collections
    @posts = new Posts    
    @wikipages = new WikiPages    
    @questions = new Questions    
    @links = new Links
    
    @current_index = 5
        
    @activities = new Activities
    @activities.bind 'add', @appendActivity
                    
    #bindings publisher events to the stream
    window.mediator.bind "new-post", (post)=>
      @addPost post  
    window.mediator.bind "new-wikipage", (wikipage)=>
      @addWikipage wikipage
    window.mediator.bind "new-question", (question)=>
      @addQuestion question
    window.mediator.bind "new-link", (link)=>
      @addLink link
    window.mediator.bind "new-silent-activity", (activity)=>
      @addSilentActivity activity
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

  appendActivity: (activity)=>
  	activityView = new ActivityView model: activity
  	@appendView activityView
    
  injectView: (view)=>
    $("#activity-stream-table").prepend(view.render().el)
    
  appendView: (view)=>
    $("#activity-stream-table").append(view.render().el)    
    
  loadMore : ()->	
  	@activities.fetch
  		data: 
  			from: @current_index
  			to: 5
  		success: (collection, response)=>
  			@current_index = @current_index + 5  			
  			if collection.length == 0
  				$(@el).find("#load-more").addClass("disabled")
  				$(@el).find("#load-more").html("Nothing more!")
  			collection.each (item)=>				  				  				
  				@appendActivity item
			
  #adding new models to the collections
  
  addPost: (post)=>        
    post.save(null,
		  success: (post)=>
		  	@posts.add post
		  	activity = new Activity
		  		actor : current_user
		  		object: post.attributes
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
		  		object: wikipage.attributes
		  		object_type: "WikiPage"
		  		verb: "create"
		  	#console.debug activity.object.get 'title'
		  	#console.debug wikipage.get 'title'			  		
	  		@addActivity activity
  		)


  addQuestion: (question)=>
    @questions.add question

  addLink: (link)=>
    @links.add link
    
  addSilentActivity:(activity)=>
  	activity.save(null,
  		success: (activity)=> 
  			@activities.add activity, {silent: true}
  			#@injectActivity activity
  		)
  		
  addActivity:(activity)=>
  	activity.save(null,
  		success: (activity)=> 
  			@activities.add activity, {silent: true}
  			@injectActivity activity
  		)  		

