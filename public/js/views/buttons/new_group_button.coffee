define [
	'jquery'
	'backbone'
	'cs!views/new_group_box'	
], ($, Backbone, NewGroupBox) ->
	class NewGroupButton extends Backbone.View	
	
		events:
			'click .btn-new-group' : "launchButton"
			
		render: ->	
			$(@el).html("<div class=\"btn btn-new-group\">Create a group</div>")	
			@
			
		launchButton: ()->
			box = new NewGroupBox
				callback : (result)->
					if result	
						console.debug 'yes'
					else
						console.debug 'no'			

