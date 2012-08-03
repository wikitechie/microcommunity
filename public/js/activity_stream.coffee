define [
	'jquery'
	'backbone'
	'cs!modules/activity'
], ($, Backbone, Activity)->
	class ActivityStream extends Backbone.View
		el: '#social-stream'
		template: _.template($('#activity-stream-template').html())
	
		events:
			'click #load-more' : 'loadMore'
	
		initialize: ->
		  _.bindAll @	
		  #initializing models collections

		  @current_index = 5
		  @loadable = true
		      
		  @activities = new Activity.Collection
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
		    @injectActivity activity
		    
		  @render()

		  #initializing posts rendered from the server

		  init_activities = new Activity.Collection
		  init_activities.add eval(activities)
		  console.debug eval(activities)
		  @process init_activities
		  
		                  
		  #wikipage = new WikiPage
		  #wikipageView = new WikiPageView        model: wikipage
		  #@injectView wikipageView
		  
		  #activity = new Activity
				#actor : current_user
				#object: wikipage
				#verb: "edit"
		                          
		  #activityView = new ActivityView        model: activity
		  #@injectView activityView
		        

		render: ->
			$(@el).html @template posts: JSON.stringify(@posts)
			@
		        
		#injecting views
		 
		injectActivity: (activity)=>
			collection = new Activity.Collection
			collection.add activity
			activityView = new Activity.View 
				collection: collection
			@injectView activityView

		appendActivity: (activity)=>
			collection = new Activity.Collection
			collection.add activity
			activityView = new Activity.View 
				collection: collection
			@appendView activityView
			
		addSilentActivity: (activity)->
			@activities.add activity, {silent: true}
		  
		injectView: (view)->
		  $("#activity-stream-table").prepend(view.render().el)
		  
		appendView: (view)->
		  $("#activity-stream-table").append(view.render().el)    
		  
		pendingLoading: ()->
		  @loadable = false
		  $("#load-more").addClass('disabled','disabled')
		  $("#load-more").spin()

		disableLoading: ()->
		  @loadable = false
		  $("#load-more").addClass('disabled','disabled')
		  $("#load-more").html("Nothing more!")
		  
		enableLoading: ()->
		  @loadable = true
		  $("#load-more").removeClass('disabled')
		  $("#load-more").spin(false)    
		    
		loadMore: ()->  	
			if @loadable is true
				@pendingLoading()
				@activities.fetch
					data:
						from: @current_index
						to: 5  			
					success: (collection, response)=>
						@current_index = @current_index + 5
						if collection.length == 0
							@disableLoading()
						if collection.length > 0
							@enableLoading()				
		
						@process collection

					

		process : (collection)->
			aggrs = []
			collection.each (scanned)=>
				verb = scanned.get 'verb'
				actor = scanned.actor
				object_type = scanned.get 'object_type'
				aggr = {}
				aggr[collection.indexOf(scanned)]	= true
				collection.each (compared) =>				
					if scanned.id isnt compared.id
						if (object_type == 'WikiPage') and (scanned.object.page.id is compared.object.page.id) and (verb == compared.get 'verb') and (actor._id is compared.actor._id)
							aggr[collection.indexOf(compared)] = true
				aggrs.push aggr	
			
				arrgs = @refine aggrs
				_.each arrgs, (group) =>
					if true
						@appendAggr collection, _.keys(group)

		
		refine : (array) ->
			to_be_removed = {}
			scanned = {}		
			_.each array, (x)->			
				_.each array, (y)->
					if not scanned[array.indexOf(y)] 
						if x isnt y
							if _.isEqual(x, y)
								scanned[array.indexOf(y)] = true
								to_be_removed[array.indexOf(y)] = true
				scanned[array.indexOf(x)] = true
			new_array = []
			_.each array, (x)->
				unless to_be_removed[array.indexOf(x)]
					new_array.push x
			new_array
			
	
		appendAggr : (collection, array)->
			aggr_collection = new Activity.Collection
			_.each array, (x)->
				aggr_collection.add collection.at(x) 
			activityView = new Activity.View
				collection: aggr_collection
			@appendView activityView


				
		addActivity:(activity)=>
			activity.save(null,
				success: (activity)=> 
					@activities.add activity, {silent: true}
					@injectActivity activity
				)  		

