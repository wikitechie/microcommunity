define([
  "bb",
	'views/items'  
], function(Backbone, ItemsView){
  return function(App, Region, options){
  
		var StreamController = Marionette.Controller.extend({
			initialize : function(options){
				this.collection = new Core.Items(options.items, { type : options.type })										
			},
			prependItem : function(item){
				this.collection.add(item, { at : 0 })
			}
		})
  
		return App.module('Stream', function(Stream, App){

			Stream.addInitializer(function(){		
				
				var controller = new StreamController({
					items : options.items,
					type : options.type
				})		

				var items = new ItemsView({	
					collection: controller.collection,
					type : options.type,
					wall : options.wall
				})			
				
				App.vent.on('publisher:newitem', function(item){				
					controller.prependItem(item) 
				})				
								
				Region.show(items)										
			})			
		})	  	
	}
	  
})
