define([
	'bb'
], function(Backbone){

	var Request = Backbone.RelationalModel.extend({
		relations : [
			{
				type : Backbone.HasOne,
				key : 'user',
				relatedModel : 'Core.User',
				includeInJSON : '_id'			
			}
		],
		serialize : function(){
			return _.extend(this.toJSON(), { user : this.get('user').serialize() })
		},
		urlRoot : function(){
			return '/api/containers/' + this.get('container') + '/requests/' + this.get('status')
		}
	})
	
	return Request
	
})
