define([
	'bb',
	'views/post',
	'text!templates/item.html'
],function(Backbone, PostView, html){

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
			this.content.show(new PostView({ model : this.model }))
		}
	})
	
	return ItemView
	
})
