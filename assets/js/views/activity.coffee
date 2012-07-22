class window.ActivityView extends Backbone.View
	className: "activity"
	template: _.template($('#activity-template').html()),

	initialize: ->
		#@commentsThread = new CommentsThreadView 
			#collection: @model.comments
			#postId: @model.id			
		@wikipageView = new WikiPageView
			model: @model.wikipage
			embeded: true

		_.bindAll @

	render: ->
		$(@el).html @template(@model.attributes)
		#$(@el).find('.comments-thread').html @commentsThread.render().el
		$(@el).find('.embeded-content').html @wikipageView.render().el		
		@

