define([
	'backbone',
	'backbone-relational'
], function(Backbone){

	User = Backbone.RelationalModel.extend({
		/* relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Wall',
				includeInJSON : Backbone.Model.prototype.idAttribute
			}
		] */
	})
	
	return User
})
