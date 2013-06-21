define([
	'bb',
	'models/item',
	'models/wikipage',
	'components/revision/views/diff',
	'text!components/revision/templates/wall-message.html',
	'text!components/revision/templates/stream-message.html'	
], function(Backbone, Item, Wikipage, DiffView, messageTemplateWall, messageTemplateStream){
	
	var Revision = Item.extend({
		messageTemplate : function(type){
			if (type == 'wall')
				return messageTemplateWall
			else
				return messageTemplateStream
		},	
		actions : [
			{ label : 'Difference', name : 'diff' }
		],
		serialize : function(){		
			var parent = Item.prototype.serialize.apply(this)		
			return _.extend(parent, { wikipage : this.get('wikipage').serialize() })
		},		
		contentView : DiffView,
		relations : [
			{
				type : Backbone.HasOne,
				key : 'wikipage',
				relatedModel : Wikipage
			}
		]		
	})		
	return Revision
})
