define([
	'bb',
],function(Backbone){

	var User = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return "/profiles/" + this.get('id')
		},		
		serialize : function(){
			var avatar = $.gravatar(this.get('email'), { size: 50 })
			return _.extend(this.toJSON(), { link : this.link(), avatar : avatar })
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
