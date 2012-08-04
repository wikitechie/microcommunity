define [
	'jquery'
	'backbone'
	'cs!models/activity'
	'cs!views/comments_thread'
	'text!templates/wikipage/show.html'
	'text!templates/wikipage/edit-buttons.html'
	'text!templates/wikipage/save-buttons.html'
	'text!templates/wikipage/body-view.html'
	'text!templates/wikipage/body-edit.html'
	'jquery.gravatar'
	'general'
	'moment'
	'diff'
	
], ($, Backbone, Activity,CommentsThreadView, show, edit_btns, save_btns, view_b, edit_b) ->
	class WikiPageView extends Backbone.View
		className : "wikipage"

		normalTemplate: _.template(show)
		editButtons: _.template(edit_btns)
		saveButtons: _.template(save_btns)
		wikipageBodyView: _.template(view_b)
		wikipageBodyEdit: _.template(edit_b)

		events:
			"click .edit-button": "editButton"
			"click .cancel-button": "cancelButton"
			"click .save-button": "saveButton"

		initialize: (options)->
			_.bindAll @
			if options.embeded
				@embeded = true
			@fullview = false
			@template = @normalTemplate
			@commentsThread = new CommentsThreadView collection: @model.comments			

		render: ->
			$(@el).html @template @model.toJSON()
			$(@el).find('.comments-thread').html @commentsThread.render().el
			unless window.current_user?
				$(@el).find('.comments-text').hide()		
			else
				$(@el).find(".buttons").html @editButtons
		

			$(@el).find(".wikipage-body-area").html @wikipageBodyView body: @model.get('body')
		
			@

		expand: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView {body: @model.get('body'), fullview: true}
	
		collapse: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView {body: @model.get('body')}
		
		disable: ->
			$(@el).find(".wikipage-body-area").spin()
			$(@el).find('.wikipage-summary').attr('disabled','disabled'	)
			$(@el).find('.wikipage-body').attr('disabled','disabled'	)
			$(@el).find('.buttons .btn').addClass('disabled')
		
		enable: ->
			$(@el).find(".wikipage-body-area").spin(false)
			$(@el).find('.wikipage-summary').removeAttr('disabled'	)
			$(@el).find('.wikipage-body').removeAttr('disabled'	)
			$(@el).find('.buttons .btn').removeClass('disabled')		

		editButton: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyEdit body: @model.get('body')
			$(@el).find(".wikipage-body").attr("rows", 3 + (@model.get('body').length/100) )
			$(@el).find(".buttons").html @saveButtons

		saveButton: ->
			@disable()
			old_text = @model.get('body')
			@model.page.save({body: $(@el).find(".wikipage-body").val() },
				success : (model, response)=>
					console.debug model.toJSON().current_revision._id
					activity = new Activity
						actor : current_user
						object: model.toJSON().current_revision._id
						object_type: "Revision"
						verb: "edit"
						diff: JsDiff.diffWords(old_text, model.get('current_revision').body)
						summary: $(@el).find(".wikipage-summary").val()
					activity.save(null,
						success: (activity)=>
							@enable()
							window.mediator.trigger("new-silent-activity", activity)
							$(@el).find(".wikipage-body-area").html @wikipageBodyView body: model.get('current_revision').body
							$(@el).find(".buttons").html @editButtons						 						
						) 			  		

				url : "/api/wikipages/#{@model.page.id}"
			)

		cancelButton: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView body: @model.get('body')
			$(@el).find(".buttons").html @editButtons		

