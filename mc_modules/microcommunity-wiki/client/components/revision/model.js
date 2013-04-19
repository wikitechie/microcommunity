define([
	'bb',
	'models/item',
	'text!components/revision/templates/wall-message.html',
	'text!components/revision/templates/stream-message.html'	
], function(Backbone, Item, messageTemplateWall, messageTemplateStream){
	
	var Revision = Item.extend({
		messageTemplate : function(type){
			if (type == 'wall')
				return messageTemplateWall
			else
				return messageTemplateStream
		}
	})		
	return Revision
})
