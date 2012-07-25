class window.ActivityView extends Backbone.View
	className: "activity"
	template: _.template($('#activity-template').html())
	
	events:
		'click .toggle-diff': 'toggleDiff'

	initialize: ->
		#@commentsThread = new CommentsThreadView 
			#collection: @model.comments
			#postId: @model.id
					
		@objectClass = @model.object.constructor.name		
		
		views_classes = 
			WikiPage : WikiPageView
			Post: PostView
			
		@view = new views_classes[@objectClass]
			model: @model.object
				
		_.bindAll @

	render: ->
		if @objectClass == "Post" && @model.get('verb') == 'create'
			$(@el).html @view.render().el
		else		
			$(@el).html @template(_.extend(@model.attributes, {message : @message(), actor : @model.actor}) )
			#$(@el).find('.comments-thread').html @commentsThread.render().el
			$(@el).find('.embeded-content').html @view.render().el
			$(@el).find('.diff-content').hide()
		@
				
		
	message: ->
			
		name = @model.actor.email
		messages = 
			WikiPage : 
				edit: "#{name} edited a wikipage titled #{@model.object.get('title')}"
				create: "#{name} created a wikipage titled #{@model.object.get('title')}"
			Post: 
				comment: "#{name} commented a post"
				create: "#{name} created a new post"
		messages[@objectClass][@model.get('verb')]
		
	toggleDiff : ->
		$(@el).find('.diff-content').slideToggle()
		

