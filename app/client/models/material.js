define([
	'bb',
	'models/section',
	'models/user'
], function(Backbone, Section, User){

	 Material = Backbone.RelationalModel.extend({
		initialize : function(data){
			var members = _.pluck(data.memberships, 'user')	
			for (var i=0; i<members.length; i++){
				members[i].roles = data.memberships[i].roles
			}			
			this.set('members', members)
		},
		defaults : {
			thumbnailPath : '/publication.png',
		},	
		idAttribute : '_id',
		link : function(){
			return '/materials/' + this.id
		},		
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wall',
				relatedModel : 'Core.Wall'
			},
			{
				type : Backbone.HasMany,
				key : 'sections',
				relatedModel : Section,
				reverseRelation : {
					key : 'parent'
				}	
			},
			{
				type : Backbone.HasMany,
				key : 'members',
				relatedModel : User
			}							
		]				
	})
	
	return Material
	
})
