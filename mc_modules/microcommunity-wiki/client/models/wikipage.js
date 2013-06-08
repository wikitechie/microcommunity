define([
	'bb',
	'models/wiki'
],function(Backbone, Wiki){

	var Wikipage = Backbone.RelationalModel.extend({
		urlRoot : '/api/wikipages',
		idAttribute : '_id',
		link : function(){
			return '/wikipages/' + this.id
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
			},
			{
				type : Backbone.HasOne,
				key : 'wiki',
				relatedModel : Wiki,
				includeInJSON : '_id'				
			}							
		]				
	})
	
	return Wikipage
	
})
