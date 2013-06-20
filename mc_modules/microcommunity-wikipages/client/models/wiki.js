define([
	'bb',
],function(Backbone){

	var Wiki = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return '/wikis/'+ this.id
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
	
	return Wiki
	
})
