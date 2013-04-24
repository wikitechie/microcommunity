define([
	'bb',
	'models/wiki',
	'text!templates/sidebars/new-wikipage.html'
],function(Backbone, Wiki, html){

	var SidebarView = Backbone.Marionette.ItemView.extend({	
		template : html	
	})
	
	return function(wikiJSON){
		var wiki = Wiki.findOrCreate(wikiJSON)
		return new SidebarView({ model : wiki })	
	}
	
})
