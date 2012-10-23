define [
	'jquery'
	'backbone'
	'cs!views/notification_item'
	'text!templates/notification_menu.html'
], ($, Backbone, NotificationItem, template) ->
	class NotificationMenu extends Backbone.View

		tagName : 'li'
		className : 'dropdown'		

		template: _.template(template)
	
		initialize: ()->		
			_.bindAll @		
					
		render: ->	
			$(@el).html @template()			
			
			item = new NotificationItem
			$(@el).find('.notifications-menu').append item.render().el
			
			item = new NotificationItem
			$(@el).find('.notifications-menu').append item.render().el
									
			@
				
