define([
	'bb',
], function(Backbone){

	var Material = Backbone.RelationalModel.extend({
		defaults : {
			photo : '/book-pile.jpg',
		},	
		idAttribute : '_id',
		link : function(){
			return '/materials/' + this.id
		},		
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		},		
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Core.Wall',
				//includeInJSON : Backbone.Model.prototype.idAttribute				
			}			
		]				
	})
	
	return Material
	
})
