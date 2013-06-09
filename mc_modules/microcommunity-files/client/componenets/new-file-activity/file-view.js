define([
	'bb',
	'text!componenets/new-file-activity/file-view.html'
], function(Backbone, html){

	var FileView = Backbone.Marionette.ItemView.extend({	
		template : html,
		serializeData : function(){
			return this.model.serialize()
		}		
	})
			
	return FileView	
})
