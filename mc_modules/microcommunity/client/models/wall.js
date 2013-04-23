define([
	'bb',
	'models/item',
	'models/user',
	'models/wikipage',
	'models/wiki'
],function(Backbone, Item, User, Wikipage, Wiki){

	var Wall = Backbone.RelationalModel.extend({	
		idAttribute : '_id',				
		link : function(){		
			switch(this.get('owner').$ref){
				case 'users':
					var user = User.findOrCreate(this.get('owner').$id)
					return user.link()
					break	
				case 'wikipages':
					var wikipage = Wikipage.findOrCreate(this.get('owner').$id)
					return wikipage.link()
					break	
				case 'wikis':
					var wiki = Wiki.findOrCreate({ _id : this.get('owner').$id })
					return wiki.link()
					break												
			}			
		},				
		serialize : function(){
			return _.extend(this.toJSON(), { link : this.link() })
		}		
	})
	
	return Wall
	
})
