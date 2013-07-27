define([
	'bb'
], function(Backbone) {
	
	var Group = Backbone.RelationalModel.extend({
	
		/*initialize : function(data){
			var members = _.pluck(data.memberships, 'user')	
			for (var i=0; i<members.length; i++){
				members[i].roles = data.memberships[i].roles
			}			
			this.set('members', members)
		},*/
		
		idAttribute : '_id',
		link : function(){
			return '/groups/' + this.id
		},	
		urlRoot : '/api/groups/',	
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Core.Wall'
			}									
		]				
	})

	return Group

})
