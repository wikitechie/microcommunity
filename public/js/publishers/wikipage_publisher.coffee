define [
	'jquery'
	'backbone'
	'cs!models/wikipage'
	'cs!models/revision'
	'cs!models/activity'
	'jquery.spin'	
], ($, Backbone, WikiPage, Revision,Activity)->
	class WikipagePublisher extends Backbone.View

		button : '#wikipage-button'
		template: _.template($('#wikipage-publisher-template').html()),

		events:
			'click #wikipage-text': 'expand'
			'click #wikipage-button': 'post'

		initialize: ->
			@render()

		render: ->
			$(@el).html @template
			return this

		disable: ->
			$("#wikipage-text").attr('disabled','disabled'	)
			$("#wikipage-title").attr('disabled','disabled'	)
			$("#wikipage-button").addClass('disabled')
			$("#spinner").spin()
		
		enable: ->
			$("#wikipage-text").removeAttr('disabled')
			$("#wikipage-title").removeAttr('disabled')
			$("#wikipage-button").removeClass('disabled')
			$("#spinner").spin(false)		

		reset: ->
			$("#wikipage-text").val("")
			$("#wikipage-text").attr("rows","1")
			$("#wikipage-title").val("")

		expand: ->
			$("#wikipage-text").attr("rows","3")

		post: ->
			wikipage = new WikiPage
			wikipage.set	{title: $("#wikipage-title").val(),	body: $("#wikipage-text").val()}
			@disable()
			wikipage.save(null,
				success: (wikipage, response)=> 
					activity = new Activity
						actor : current_user
						object: wikipage.attributes.current_revision					
						object_type: "Revision"
						verb: "create"
					activity.save({},
						success: (activity)=>
							window.mediator.trigger("new-activity", activity)
							@enable()
							@reset()
						)	  	
				)	

