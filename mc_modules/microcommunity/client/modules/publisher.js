define([
  "bb",
	'views/index'  
], function(Backbone, Views){
  return function(App, options, callback){  
		return App.module('Publisher', function(Publisher, App){
			Publisher.addInitializer(function(){
				if (App.currentUser){
					var publisher = new Views.PublisherView({
						wall : options.wall,
						identifier : options.identifier
					})
					callback(publisher)		
				}				
			})
		})		  	
	}	  
})
