define([
	'bb'
], function(Backbone){

	var MessageView = Backbone.Marionette.ItemView.extend({
		className : 'activityMessage',
		serializeData : function(){
			return this.model.serialize()	  
		},				
	})	

	return MessageView	
})
