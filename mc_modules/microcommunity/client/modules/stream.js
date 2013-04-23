define([
  "bb",
	'views/index'  
], function(Backbone, Views){
  return function(App, options, callback){
		return App.module('Stream', function(Stream, App){		
			var collection				
			Stream.add = function(item){
				collection.add(item, { at : 0 })
			}			
			Stream.addInitializer(function(){
				collection = new Core.Items(options.items, { type : options.type })					
				var items = new Views.ItemsView({	
					collection: collection,
					width : options.width,
					type : options.type,
					wall : options.wall
				})				
				callback(items)							
			})			
		})	  	
	}  
})
