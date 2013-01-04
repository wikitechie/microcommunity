define [
	'jquery'
	'backbone'
	'cs!models/post'
	'cs!models/activity'
	'jquery.spin'
], ($, Backbone, Post, Activity)->
	class PostPublisher extends Backbone.View
		id: "post-publisher"
		button : '#post-button'
		template: _.template($('#post-publisher-template').html()),

		events:
			'click #publisher-text': 'expand'
			'click #post-button' : 'newpost'

		initialize: ->
			@render()

		render: ->
			$(@el).html @template
			@

		disable: ->
			$("#publisher-text").attr("disabled","disabled")
			$(@button).attr("disabled","disabled")
			$(@el).spin()

		expand: ->
			$("#publisher-text").attr("rows","3")
		
		disable: ->
			$("#publisher-text").attr('disabled','disabled'	)
			$("#post-button").addClass('disabled')
			$("#spinner").spin()
		
		enable: ->
			$("#publisher-text").removeAttr('disabled')
			$("#post-button").removeClass('disabled')
			$("#spinner").spin(false)						

		reset: ->
			$("#publisher-text").val("")
			$("#publisher-text").attr("rows","1")

		newpost: ->

			attrs =
				content: $("#publisher-text").val()
				author: current_user				
				parent : @options.parent
			post = new Post attrs				
				
			if post.isValid()	
				@disable()
				callbacks =
					success : (model, response, options)=> 
						activity = new Activity model.get('activity')
						window.mediator.trigger("new-activity", activity)
						@enable()
						@reset()
													
					error : ()=> 
						console.debug 'error'
						@enable()
						@reset()						

				post.save(attrs, callbacks)

				
						
				
					


