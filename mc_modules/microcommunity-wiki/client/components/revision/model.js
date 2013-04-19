define([
	'bb',
	'models/item',
	'components/revision/views/diff',
	'text!components/revision/templates/wall-message.html',
	'text!components/revision/templates/stream-message.html'	
], function(Backbone, Item, DiffView, messageTemplateWall, messageTemplateStream){
	
	var Revision = Item.extend({
		messageTemplate : function(type){
			if (type == 'wall')
				return messageTemplateWall
			else
				return messageTemplateStream
		},
		contentView : DiffView
	})		
	return Revision
})
