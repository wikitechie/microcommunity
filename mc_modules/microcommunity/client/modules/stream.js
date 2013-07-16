define([
  "bb",
	'views/items'  
], function(Backbone, ItemsView){
  return function(App, region, stream){
  
		var ItemsController = Marionette.Controller.extend({
			initialize : function(options){
				this.collection = options.items	
				this.collection.parent = stream						
			},
			prependItem : function(item){
				this.collection.add(item, { at : 0 })
			}
		})
  
		return App.module('Stream', function(Stream, App){

			Stream.addInitializer(function(){	
			
				var controller = new ItemsController({
					items : stream.get('items')
				})		

				var itemsView = new ItemsView({	
					collection: stream.get('items'),
					model : stream				
				})			
				
				App.vent.on('publisher:newitem', function(item){				
					controller.prependItem(item) 
				})				
								
				region.show(itemsView)										
			})			
		})	  	
	}
	  
})
