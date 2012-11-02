define [
	'jquery'
	'backbone'
	'cs!models/activity'
	'text!templates/wikipage/show.html'
	'text!templates/wikipage/edit-buttons.html'
	'text!templates/wikipage/save-buttons.html'
	'text!templates/wikipage/body-view.html'
	'text!templates/wikipage/body-edit.html'
	'jquery.gravatar'
	'general'
	'moment'
	'diff'
	'lib/markdown.converter'
	'lib/markdown.editor'
	'lib/markdown.sanitizer'
	'lib/htmldomparser'
	'lib/html2markdown'

], ($, Backbone, Activity, show, edit_btns, save_btns, view_b, edit_b) ->
	class WikiPageView extends Backbone.View
		className : "wikipage"

		normalTemplate: _.template(show)
		editButtons: _.template(edit_btns)
		saveButtons: _.template(save_btns)
		wikipageBodyView: _.template(view_b)
		wikipageBodyEdit: _.template(edit_b)
		hoveredParagraph: null
		selectedParagraph: null

		events:
			"click .edit-button": "editButton"
			"click .cancel-button": "cancelButton"
			"click .save-button": "saveButton"
			"mouseenter p": "showEditButton"
			"mouseleave p": "hideEditButton"
			"click .quick-edit-button": "openQuickEditBox"
			"keypress .quick-edit-box": "onQuickEditBoxKeypress"
			"keyup .quick-edit-box": "onQuickEditBoxKeyup"
		initialize: (options)->
			_.bindAll @
			if options.embeded
				@embeded = true
			@fullview = false
			@template = @normalTemplate
			@quickEditButton = $("<button class='btn btn-info btn-mini quick-edit-button' style='position: absolute;'>Edit</button>")
			@quickEditBox = $("<textarea class='quick-edit-box floating_panel'></textarea>")
			$(@quickEditBox).hide()
			$(@quickEditButton).hide()
			this.converter = new Markdown.Converter()

		render: ->
			$(@el).html @template @model.toJSON()
			if window.current_user?
				$(@el).find(".buttons").html @editButtons
			$(@el).find(".wikipage-body-area").html @wikipageBodyView content: @model.get('content')
			$(@el).append(@quickEditButton)
			$(@el).append(@quickEditBox)
			@

		expand: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView {content: @model.get('content'), fullview: true}

		collapse: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView {content: @model.get('content')}

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
			page_hieght = $($(@el).find(".wikipage-view-body")).outerHeight()
			$(@el).find(".wikipage-body-area").html @wikipageBodyEdit content: @model.get('content')
			$(@el).find(".wikipage-body").height(page_hieght + 20)
			#$(@el).find(".wikipage-body").attr("rows", 3 + (@model.get('body').length/100) )
			$(@el).find(".buttons").html @saveButtons

		saveButton: ->
			@disable()
			old_text = @model.get('content')
			@model.get('page').save({ content: $(@el).find(".wikipage-body").val(), summary : $(@el).find(".wikipage-summary").val(), diff : JsDiff.diffWords(old_text, $(@el).find(".wikipage-body").val() ), author:  current_user._id },
				success : (model, response)=>
					@model.set
						content : model.toJSON().current_revision.content
						_id : model.toJSON().current_revision._id
					activity = new Activity
						actor : current_user
						object: model.toJSON().current_revision
						object_type: "Revision"
						verb: "edit"
						target : model
						target_type : "WikiPage"
					activity.save(null,
						success: (activity)=>
							@enable()
							window.mediator.trigger("new-silent-activity", activity)
							$(@el).find(".wikipage-body-area").html @wikipageBodyView content: model.get 'content'
							$(@el).find(".buttons").html @editButtons
						)

				url : "/api/wikipages/#{@model.get('page').id}"
			)
		save: (new_text, old_text, summary='', success) ->
			@model.get('page').save({ content: new_text, summary : summary, diff : JsDiff.diffWords(old_text, new_text ), author:  current_user._id },
				success : (model, response)=>
					@model.set
						content : model.toJSON().current_revision.content
						_id : model.toJSON().current_revision._id
					activity = new Activity
						actor : current_user
						object: model.toJSON().current_revision
						object_type: "Revision"
						verb: "edit"
					activity.save(null,
						success: (activity)=>
							@enable()
							window.mediator.trigger("new-silent-activity", activity)
							$(@el).find(".wikipage-body-area").html @wikipageBodyView content: model.get 'content'
							$(@el).find(".buttons").html @editButtons
						)
					success(model, response) if success

				url : "/api/wikipages/#{@model.get('page').id}"
			)
		cancelButton: ->
			$(@el).find(".wikipage-body-area").html @wikipageBodyView content: @model.get('content')
			$(@el).find(".buttons").html @editButtons
		showEditButton: (e) ->
			$(@quickEditButton).fadeIn('fast');
			current_p = e.currentTarget
			@hoveredParagraph = current_p
			p_pos = $(current_p).offset()
			p_pos.left += ($(current_p).innerWidth() - $(@quickEditButton).outerWidth())
			$(@quickEditButton).offset(p_pos)
		hideEditButton: (e) ->
			targetElement = e.toElement || e.relatedTarget
			if (targetElement isnt @quickEditButton[0])
				$(@quickEditButton).hide()
		openQuickEditBox: ->
			this.cancelQuickEdit()
			
			@selectedParagraph = @hoveredParagraph
			p_width = $(@selectedParagraph).width()
			p_height= $(@selectedParagraph).height()
			$(@quickEditButton).hide()
			markdown_text = HTML2Markdown($(@selectedParagraph).html());
			$(@quickEditBox).html(markdown_text)
			$(@quickEditBox).show()
			editbox_pos = {
				x : $(@selectedParagraph).offset().left 
				y : $(@selectedParagraph).offset().top + p_height 
			}
			$(@quickEditBox).css(editbox_pos);
			$(@quickEditBox).width(p_width)
			$(@quickEditBox).height(p_height+ 15)
		onQuickEditBoxKeypress: (e) ->
			code = e.keyCode or e.which
			if (code == 13 && !e.shiftKey)
				old_text = @getBody()
				#new_text = $(@quickEditBox).val()
				#$(@selectedParagraph).html(new_text)
				$(@quickEditBox).hide()
				new_text = HTML2Markdown($(@el).find('.wikipage-view-body').html())
				@save(new_text,old_text,'partial edit')
			else
				html_data = this.converter.makeHtml($(@quickEditBox).val())
				$(@selectedParagraph).html(html_data)
		onQuickEditBoxKeyup: (e) ->
			code = e.keyCode or e.which
			if (code == 27) # for the escape key
				@cancelQuickEdit()
			else
				html_data = this.converter.makeHtml($(@quickEditBox).val())
				$(@selectedParagraph).html(html_data)
		cancelQuickEdit: ->
			$(@quickEditBox).hide()
		getBody: ->
			return @model.get('page').attributes.current_revision.content

