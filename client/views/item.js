define([
	'bb',
	'text!templates/item.html'
],function(Backbone, html){

	var ItemView = Backbone.Marionette.ItemView.extend({	
		initialize : function(options){
			this.parentType = options.parentType
		},	
		template : html,
		serializeData: function(){
			return this.model.serialize()	  
		}
	})
	
	return ItemView
	
})
