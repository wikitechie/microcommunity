define([
	'bb',
	'text!templates/attachement-list.html',
	'views/attachement'	
], function(Backbone, html, AttachementView){

	var AttachementListView = Backbone.Marionette.CompositeView.extend({
		template : html,
		itemView : AttachementView,
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('ul').append(itemView.el)
		}
	})
		
	return AttachementListView	
})
