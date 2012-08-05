define [
	'jquery'
	'backbone'
	'text!templates/activity.html'
	'cs!modules/post'
	'cs!modules/wikipage'
	'cs!models/revision'
	'cs!models/diff'
	'cs!views/diff'
	'jquery.gravatar'
	'general'
	'moment'
	'diff'	
], ($, Backbone, template,Post, WikiPage, Revision, Diff, DiffView) ->
	class ActivityView extends Backbone.View
		className: "activity"
		template: _.template(template)

		initialize: ->
		
			#@commentsThread = new CommentsThreadView 
				#collection: @model.comments
				#postId: @model.id

			if @collection.length is 1
				@singleMode = true			
			
			@model = @collection.at(0)
	
			@objectClass = @model.get('object').constructor.name
		
			views_classes = 
				#WikiPage : WikiPage.View
				Post: Post.View
				Revision: WikiPage.View

			
			@view = new views_classes[@objectClass]
				model: @model.get('object')

			if @singleMode			
				if @objectClass == 'Revision' && @model.get('verb') == 'edit'
					mydiff = new Diff
						diff    : @model.get('object').get('diff')
						summary : @model.get('object').get('summary')				
						created_at : @model.get('object').get('created_at')
				
					@diffView = new DiffView 
						model : mydiff
			else
				@diffViews = []
				@collection.each (model)=>
					if @objectClass == 'Revision' && @model.get('verb') == 'edit'
						mydiff = new Diff
							diff    : model.get('object').get('diff')
							summary : model.get('object').get('summary')
							created_at : model.get('object').get('created_at')					
						diffView = new DiffView 
							model : mydiff				
						@diffViews.push diffView
						

						
			_.bindAll @

		render: ->
			if @objectClass == "Post" && @model.get('verb') == 'create'
				$(@el).html @view.render().el					
			else		
				$(@el).html @template _.extend(@model.toJSON(),  {message : @message()} )
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

			name = @model.get('actor').get('email')
			messages = 
				Revision : 
					edit: "#{name} edited a wikipage titled #{@model.get('object').get('page').get('title')}"
					aggr_edit : "#{name} made several edits on the wikipage titled #{@model.get('object').get('page').get('title')}"
					create: "#{name} created a wikipage titled #{@model.get('object').get('page').get('title')}"
				Post: 
					comment: "#{name} commented a post"
					create: "#{name} created a new post"
	
			if @singleMode
				messages[@objectClass][@model.get('verb')]
			else
				messages[@objectClass].aggr_edit
			
			
		
	

