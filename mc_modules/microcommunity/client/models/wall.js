define([
	'bb',
	'models/item',
	'models/user',
	//'models/wikipage',
	//'models/wiki',
	//'models/material'
], function(Backbone, Item, User, Wikipage, Wiki, Material){

	var Wall = Backbone.RelationalModel.extend({	
		idAttribute : '_id',				
		link : function(){
			switch(this.get('owner').$ref){
				case 'users':
					var user = User.findOrCreate(this.get('owner').$id)
					return user.link()
					break	
				/*case 'wikipages':
					var wikipage = Wikipage.findOrCreate({ _id : this.get('owner').$id })
					return wikipage.link()
					break	
				case 'wikis':
					var wiki = Wiki.findOrCreate({ _id : this.get('owner').$id })
					return wiki.link()
					break	
				case 'containers':
					var material = Material.findOrCreate({ _id : this.get('owner').$id })
					return material.link()
					break		*/																					
			}			
		},	
		defaults : {
			objectType : 'wall'
		},			
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		},
		url : function(){
			if (!this.get('wallType')) { throw "Wall: Undefined wallType error" }
			else {
				return '/api/walls/' + this.id + '/' + this.get('wallType')
			}			
		},	
		relations : [
			{
				type : Backbone.HasMany,
				key : 'items',
				relatedModel : 'Core.Item',
				collectionType : 'Core.Items',
				/*reverseRelation : {
					key : 'parentWall',
					includeInJSON : false
				}*/
			}				
		
		]		
	})
	
	return Wall
	
})
