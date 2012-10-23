define [
	'jquery'
	'backbone'
	'text!templates/forms/new_group.html'	
	'bootbox'	
], ($, Backbone, group_form_template) ->
	class NewGroupBox extends Backbone.View
	
		new_group_form : _.template group_form_template

		initialize: ->
			@box = bootbox.dialog @new_group_form( {current_user : current_user._id})
			@box.find('.btn-cancel').click ()=> 
				@box.modal('hide')
