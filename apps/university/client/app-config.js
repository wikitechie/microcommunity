define([
	'views/pin-attachement-modal',
	'models/material',
	'components/activity/model',	
	'componenets/new-file-activity/model'		
], function(PinAttachementModal, Material, NewWikipageActivity, NewFileActivity){

	function pinResourceMenuItem(resource, prototype){
		var menuItem = { 
			name : 'pin-outline', 
			label : 'Pin to outline...', 
			handler : function(model){	
				var material = Material.findOrCreate(server.currentContainer)				
				var pinAttachement = new PinAttachementModal({ 
					model : material, 
					resource : model.get(resource)
				})
				pinAttachement.show()				
			},
			condition : function(model){
				if (server.currentContainer && App.isContainerAdmin()) return true
				else return false
			}
		}
		
		if (!prototype.menu) prototype.menu = []
		prototype.menu.push(menuItem)				
	}
	
	return function(App){	
		pinResourceMenuItem('wikipage', NewWikipageActivity.prototype)
		pinResourceMenuItem('file', NewFileActivity.prototype)	
	}
	
})
