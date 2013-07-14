define([
	'bb',
	'models/item',
	'models/file',
	'componenets/new-file-activity/file-view',
	'views/item-plugins/comments',	
], function(Backbone, Item, File, FileView, Comments){
	
	var Activity = Item.extend({
		messageTemplate : function(type, wall){
			if (!wall){
				return 'uploaded a new file to a course'
			} else {				
				return 'uploaded a new file'
			}
		},
		contentView : FileView,		
		pluginView : Comments,
		serialize : function(){
			var parent = Item.prototype.serialize.apply(this)		
			return _.extend(parent, { file : this.get('file').serialize() })
			return parent
		},
		relations : [
			{
				type : Backbone.HasOne,
				key : 'file',
				relatedModel : File
			}
		]	
	})		
	
	return Activity
})
