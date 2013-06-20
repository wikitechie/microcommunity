define([
	'bb',
], function(Backbone){

	var File = Backbone.RelationalModel.extend({
		idAttribute : '_id',
		link : function(){
			return '/files/' + this.id
		},
		serialize : function(){
			return _.extend(this.toJSON(), {  link : this.link() })
		}
	})
	
	return File
	
})
