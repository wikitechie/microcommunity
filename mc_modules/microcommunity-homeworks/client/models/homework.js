define([
	'bb'
],function(Backbone){

	var Homework = Backbone.RelationalModel.extend({
		urlRoot : '/api/homeworks',
		idAttribute : '_id',
		link : function(){
			return '/homeworks/' + this.id
		},		
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		},		
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Core.Wall',
				includeInJSON : '_id'
			}						
		]				
	})
	
	return Homework
	
})
