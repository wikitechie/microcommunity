define([
	'bb',
	'text!templates/group-list.html',
	'text!templates/group.html',	
], function(Backbone, html, groupHtml){

	var GroupView = Backbone.Marionette.ItemView.extend({
		tagName : 'li',	
		template : groupHtml,
		className : 'span4 thumbnail',
		attributes : { style : 'margin:4px; min-height:100px;' },					
		serializeData : function(){
			return this.model.serialize()
		}		
	})

	var GroupListView = Backbone.Marionette.CompositeView.extend({
		tagName : 'ul',	
		template : '',
		className : 'thumbnails',		
		itemView : GroupView	 
	})
		
	return GroupListView	
})
