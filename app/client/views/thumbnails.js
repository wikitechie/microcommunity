define([
	'bb',
	'text!templates/thumbnail.html'
], function(Backbone, html){

	var ThumbnailView = Backbone.Marionette.ItemView.extend({
		tagName : 'li',	
		className : 'span3',		
		template : html,
		serializeData : function(){
			return this.model.serialize()
		}		
	})

	var ThumbnailsView = Backbone.Marionette.CompositeView.extend({
		tagName : 'ul',
		className : 'thumbnails',
		template : '',
		itemView : ThumbnailView			 
	})
		
	return ThumbnailsView	
})
