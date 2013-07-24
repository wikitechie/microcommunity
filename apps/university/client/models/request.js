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
			return '/api/materials/' + this.get('material') + '/requests/' + this.get('status')
		}
	})
	
	return Request
	
})
