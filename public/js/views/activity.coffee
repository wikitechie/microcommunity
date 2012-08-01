define [
	'jquery'
	'backbone'
	'cs!modules/post'
	'cs!modules/wikipage'
	'cs!models/revision'
	'cs!models/diff'
	'cs!views/diff'
], ($, Backbone, Post, WikiPage, Revision, Diff, DiffView) ->
	class ActivityView extends Backbone.View
		className: "activity"
		template: _.template($('#activity-template').html())

		initialize: ->
			#@commentsThread = new CommentsThreadView 
				#collection: @model.comments
				#postId: @model.id

			if @collection.length is 1
				@singleMode = true
			
			@model = @collection.at(0)
	
			@objectClass = @model.object.constructor.name
		
			views_classes = 
				#WikiPage : WikiPage.View
				Post: Post.View
				Revision: WikiPage.View
		
			@view = new views_classes[@objectClass]
				model: @model.object
				
			if @singleMode			
				if @objectClass == 'WikiPage' && @model.get('verb') == 'edit'
					mydiff = new Diff
						diff    : @model.get('diff')
						summary : @model.get('summary')				
						created_at : @model.get('created_at')
				
					@diffView = new DiffView 
						model : mydiff
			else
				@diffViews = []
				@collection.each (model)=>
					if @objectClass == 'Revision' && @model.get('verb') == 'edit'
						mydiff = new Diff
							diff    : model.get('diff')
							summary : model.get('summary')
							created_at : model.get('created_at')					
						diffView = new DiffView 
							model : mydiff				
						@diffViews.push diffView
						
			_.bindAll @

		render: ->
			if @objectClass == "Post" && @model.get('verb') == 'create'
				$(@el).html @view.render().el					
			else		
				$(@el).html @template(_.extend(@model.attributes, {message : @message(), actor : @model.actor}) )
				#$(@el).find('.comments-thread').html @commentsThread.render().el
				$(@el).find('.embeded-content').html @view.render().el
				if @singleMode
					if @objectClass == 'Revision' && @model.get('verb') == 'edit'
						$(@el).find('.attachements').append @diffView.render().el				
						$(@el).find('.diff-content').hide()
				else
					_.each @diffViews, (diffView)=>
						if @objectClass == 'Revision' && @model.get('verb') == 'edit'
							$(@el).find('.attachements').append diffView.render().el				
							$(@el).find('.diff-content').hide()				
			@
				
		
		message: ()->

			name = @model.actor.email
			messages = 
				Revision : 
					edit: "#{name} edited a wikipage titled #{@model.object.page.get('title')}"
					aggr_edit : "#{name} made several edits on the wikipage titled #{@model.object.page.get('title')}"
					create: "#{name} created a wikipage titled #{@model.object.page.get('title')}"
				Post: 
					comment: "#{name} commented a post"
					create: "#{name} created a new post"
	
			if @singleMode
				messages[@objectClass][@model.get('verb')]
			else
				messages[@objectClass].aggr_edit
			
			
		
	

