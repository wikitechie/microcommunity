define([
	'bb',
	'text!templates/item.html'
],function(Backbone, html){
	var ItemView = Backbone.Marionette.Layout.extend({	
		initialize : function(options){
			this.parentType = options.parentType
		},	
		template : html,
		serializeData: function(){
			return this.model.serialize()	  
		},
		regions : {
			content : '.content'
		},
		onRender : function(){
			//TODO: create a generic logic here			
			var View = this.model.contentView
			this.content.show(new View({ model : this.model }))
		}
	})	
	return ItemView	
})
