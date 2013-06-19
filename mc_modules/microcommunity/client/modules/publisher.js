define([
  "bb",
	'views/publisher-container'	
], function(Backbone, PublisherView){
  return function(App, Region, options){
    
		return App.module('Publisher', function(Publisher, App){
		
			Publisher.addInitializer(function(){
				if (App.isLoggedIn()){
					var publishers = new Backbone.Collection(options.publishers)	
					var publisher = new PublisherView({ 
						collection : publishers,
						wall : options.wall
					})									
					Region.show(publisher)										
				}				
			})
			
		})
				  	
	}	  
})
