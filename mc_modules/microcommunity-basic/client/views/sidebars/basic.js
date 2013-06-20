define([
	'bb',
	'text!templates/sidebars/basic.html',
	'text!templates/sidebars/link.html'
], function(Backbone, html, linkTemplate){


	var LinkView = Backbone.Marionette.ItemView.extend({
		tagName : 'li',
		template : linkTemplate
	})

	var SidebarView = Backbone.Marionette.CompositeView.extend({
		itemView : LinkView,	
		template : html,
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('ul').append(itemView.el)		
		}	
	})	
	
	return SidebarView	
})
