define [
	'jquery'
	'backbone'
	'text!templates/activity.html'
	'cs!views/post'
	'cs!views/wikipage'
	'cs!models/revision'
	'cs!views/diff'
	'../../shared/activity-message.js'
	'jquery.gravatar'
	'general'
	'moment'
	'diff'	
], ($, Backbone, template,Post, WikiPage, Revision, DiffView, activityMessage) ->
	class ActivityView extends Backbone.View
		className: "activity"
		template: _.template(template)

		initialize: ->


			if @collection? and (@collection.length is 1)
				@singleMode = true			
			
			unless @model?
				@model = @collection.at(0)
			else
				@singleMode = true
	
			@objectClass = @model.get('object').get('objectType')
		
			views_classes = 
				post: Post
				Revision: WikiPage
			
			@view = new views_classes[@objectClass]
				model: @model.get('object')
				
			

			if @singleMode			
				if @objectClass == 'Revision' && ((@model.get('verb') == 'edit') or (@model.get('verb') == 'upvote') or (@model.get('verb') == 'downvote'))
					
					@diffView = new DiffView 
						model : @model.get 'object'
			else
				@diffViews = []
				@collection.each (model)=>
					if @objectClass == 'Revision' && @model.get('verb') == 'edit'					
						diffView = new DiffView 
							model : model.get 'object'				
						@diffViews.push diffView
												
			_.bindAll @

		render: ->

			if @objectClass == "post" && @model.get('verb') == 'create'
				$(@el).html @view.render().el					
			else
				message = @message(@model.toJSON(), @singleMode)
				
				$(@el).html @template _.extend(@model.toJSON(),  {message : message } )				
				
				$(@el).find('.embeded-content').html @view.render().el
													
				if @singleMode					
					if @objectClass == 'Revision' && ((@model.get('verb') == 'edit') or (@model.get('verb') == 'upvote') or (@model.get('verb') == 'downvote'))
						$(@el).find('.attachements').append @diffView.render().el				
						$(@el).find('.diff-content').hide()
				else
					_.each @diffViews, (diffView)=>
						if @objectClass == 'Revision' && @model.get('verb') == 'edit'
							$(@el).find('.attachements').append diffView.render().el				
							$(@el).find('.diff-content').hide()			
								
			@
				
		
		message: activityMessage.message


	

