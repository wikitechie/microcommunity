define([
	'bb',
	'text!templates/sidebars/basic.html'
],function(Backbone, html){

	var SidebarView = Backbone.Marionette.ItemView.extend({	
		template : html	
	})	
	
	return SidebarView	
})
