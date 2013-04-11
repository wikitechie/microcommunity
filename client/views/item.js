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
			return _.extend(this.model.toJSON(), {
				author : _.extend(this.model.get('author').toJSON(), { link : this.model.get('author').link()}),
				wall : _.extend(this.model.get('wall').toJSON(), { link : this.model.get('wall').get('owner').link()}),
				parentType : this.parentType,
			})		  
		},		
	})
	
	return ItemView
	
})
