define([
	'bb',
	'models/item',
	'./view'
], function(Backbone, Item, PostView){

	var Post = Item.extend({
	
		urlRoot : function(){
			var base = Post.__super__.urlRoot.apply(this, arguments)
			return base	+ '/posts'		
		},
		
		contentView : PostView,	

		msg : function(){			
			var msg
			if ( this.get('wall').id == this.get('author').get('wall').id )	
				msg = ' posted on his wall '
			else
				msg = ' posted on ' 
					+ this.get('wall').get('owner').get('displayName') 
					+ '\'s wall '
		
			return this.get('author').get('displayName') 
				+ msg 
				+ this.get('content')		
		}	
	})
	
	return Post

})
