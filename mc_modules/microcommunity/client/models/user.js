define([
	'bb',
],function(Backbone){

	var User = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return "/profiles/" + this.get('id')
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
	return User
	
})
