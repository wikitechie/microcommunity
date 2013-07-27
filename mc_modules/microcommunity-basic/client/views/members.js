define([
	'bb',
	'text!templates/members.html',
	'text!templates/member.html',	
], function(Backbone, html, memberHtml){

	var MemberView = Backbone.Marionette.ItemView.extend({
		template : memberHtml,
		serializeData : function(){
			return this.model.serialize()
		}				
	})

	var MembersView = Backbone.Marionette.CompositeView.extend({
		template : html,
		itemView : MemberView,
		appendHtml : function(collectionView, itemView, index){
			collectionView.$('#members-list').append(itemView.el)
		}		 
	})
		
	return MembersView	
})
