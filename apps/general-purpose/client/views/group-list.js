define([
	'bb',
	'text!templates/group-list.html',
	'text!templates/group.html',	
], function(Backbone, html, groupHtml){

	var GroupView = Backbone.Marionette.ItemView.extend({
		className : 'row-fluid',
		template : groupHtml,
		serializeData : function(){
			return this.model.serialize()
		}		
	})

	var GroupListView = Backbone.Marionette.CompositeView.extend({
		template : '',
		itemView : GroupView	 
	})
		
	return GroupListView	
})
