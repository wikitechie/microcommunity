define([
	'bb',
	'models/item',
	'models/wikipage',
	'components/revision/views/diff',
	'views/item-plugins/comments',	
	'text!components/revision/templates/wall-message.html',
	'text!components/revision/templates/stream-message.html'	
], function(Backbone, Item, Wikipage, DiffView, Comments, messageTemplateWall, messageTemplateStream){
	
	var Revision = Item.extend({
		messageTemplate : function(parent){
			if (parent && parent.get('objectType') == 'wall')
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
		pluginView : Comments,
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
