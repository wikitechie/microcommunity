define([
	'modelsdraft/item',
	'backbone',		
	'backbone-relational'
], function(Item, Backbone){

	Post = Item.extend({
		urlRoot : '/api/posts',	
		
		msg : function(){			
			var msg						
			if ( this.get('wall').id == this.get('author').get('wall').id )	
				msg = ' posted on his wall '
			else
				msg = ' posted on ' 
					+ this.get('wall').get('owner').get('name') 
					+ '\'s wall '
				
			return this.get('author').get('name') 
				+ msg 
				+ this.get('content')		
		}		
								
	})
	
	return Post
})
