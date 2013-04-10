define([
	'bb',
	'text!templates/item.html'
],function(Backbone, html){

	var ItemView = Backbone.Marionette.ItemView.extend({	
		template : html,
		serializeData: function(){
			return _.extend(this.model.toJSON(), {
				author : this.model.get('author').toJSON(),
				wall : this.model.get('wall').toJSON()
			})		  
		},		
	})
	
	return ItemView
	
})
