define([
	'bb',
	'models/item',	
	'views/photo',		
], function(Backbone, Item, PhotoView){
	var Photo = Item.extend({	
		urlRoot : function(){
			var base = Photo.__super__.urlRoot.apply(this, arguments)
			return base	+ '/photos'		
		},
		
		contentView : PhotoView,					
	})	
	return Photo

})
