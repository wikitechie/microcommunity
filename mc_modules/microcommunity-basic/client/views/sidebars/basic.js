define([
	'bb',
	'text!templates/sidebars/basic.html'
], function(Backbone, html){

	var Links = Backbone.Collection.extend()

	var LinkView = Backbone.Marionette.ItemView.extend({
		tagName : 'li',
		template : "<a href ='<%= url %>'><%= label %></a>"
	})

	var SidebarView = Backbone.Marionette.CompositeView.extend({
		initialize : function(options){
			this.collection = new Links(options.links)
			this.header = options.header
		},
		serializeData : function(){
			return { header : this.header }
		},
		itemView : LinkView,	
		template : html,
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('ul').append(itemView.el)		
		}	
	})	
	
	return SidebarView	
})
