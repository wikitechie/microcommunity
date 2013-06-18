define([
  "bb",
	'views/publisher-constructor' 
], function(Backbone, PublisherConstructor){
  return function(App, Region, options){
    
		return App.module('Publisher', function(Publisher, App){
		
			Publisher.addInitializer(function(){
				if (App.isLoggedIn()){
								
					var wallOptions = {
						wall : options.wall,
						identifier : options.identifier
					}				
					var PublisherView = PublisherConstructor(options.publishers)
					
					var publisher = new PublisherView(wallOptions)
									
					Region.show(publisher)										
				}				
			})
			
		})
				  	
	}	  
})
