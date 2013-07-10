define([
	'bb',
], function(Backbone){

	var Answer = Backbone.RelationalModel.extend({
		idAttribute : '_id'	,
		urlRoot : function(){
			return '/api/questions/' + this.get('question') + '/answers'
		},
		serialize : function(){
			return _.extend(this.toJSON(), { author: this.get('author').serialize()	})
		},
		defaults : {
			votesCount : 0
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'author',
				relatedModel : 'Core.User',
				includeInJSON : '_id'			
			}
		]
	})	
	return Answer
	
})
