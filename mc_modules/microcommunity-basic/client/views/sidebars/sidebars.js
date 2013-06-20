define([
	'bb',
	'views/sidebars/basic',
], function(Backbone, SidebarView){
	var SidebarsView = Backbone.Marionette.CompositeView.extend({
		template : '',
		itemView : SidebarView,
		itemViewOptions : function(model, index){		
			return {
				model : model,
				collection : new Backbone.Collection(model.get('links'))
			}		
		}				 
	})	
	return SidebarsView	
})
