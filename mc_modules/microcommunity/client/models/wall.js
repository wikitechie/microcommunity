define([
	'bb',
	'models/item',
],function(Backbone, Item, User){

	var Wall = Backbone.RelationalModel.extend({	
		idAttribute : '_id',		
		link : function(){		
			switch(this.get('owner').$ref){
				case 'users':
					return "/profiles/" + this.get('owner').$id	
					break	
				case 'wikipages':
					return "/wiki/" + this.get('owner').$id	
					break							
			}
		},				
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		}
		
	})
	
	return Wall
	
})
