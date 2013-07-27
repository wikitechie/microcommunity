define([
	'bb',
	'views/new-group-modal'
], function(Backbone, NewGroupModal){

	var NewGroupButton = Backbone.Marionette.ItemView.extend({
		tagName : 'a',
		className : 'btn btn-primary',
		template : "New Group",
		events : {
			'click' : 'click'
		},
		click : function(){
			var modal = new NewGroupModal()	
			modal.show()
		}			
	})
	
	return NewGroupButton	
})
