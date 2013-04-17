define([
	'bb',
	'text!templates/sidebars/new-wikipage.html'
],function(Backbone, html){

	var SidebarView = Backbone.Marionette.ItemView.extend({	
		template : html	
	})	
	
	return SidebarView	
})
