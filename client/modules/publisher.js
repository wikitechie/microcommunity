define([
  "bb",
	'views/index'  
], function(Backbone, Views){
  return function(App, wall, callback){  
		return App.module('Publisher', function(Publisher, App){
			Publisher.addInitializer(function(){
				if (App.currentUser){
					var publisher = new Views.PublisherView({
						wall : wall
					})
					callback(publisher)		
				}				
			})
		})		  	
	}	  
})
