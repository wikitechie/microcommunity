define [
	'jquery'
	'backbone'
	'text!templates/notification_item.html'
], ($, Backbone, template) ->
	class NotificationItem extends Backbone.View

		className : 'notification-item'		

		template: _.template(template)
	
		initialize: ()->		
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()

			@
				
