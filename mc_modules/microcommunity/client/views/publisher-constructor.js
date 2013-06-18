define([
	'bb',
	'text!templates/publisher.html'
], function(Backbone, html){

	return function PublisherContainerConstructor(publishers){
		
		function constructTemplate(){
			var container = $('<div>')		
			container.append(html)	
			publishers.forEach(function(publisher){
				container.find('.nav-tabs')
					.append("<li><a href='#"+publisher.identifier+"'>"+publisher.label+"</a></li>")
				container.find('.tab-content')
					.append("<div class='tab-pane' id='"+publisher.identifier+"'></div>")
			})		
			return container.html()
		}
	
		function constructRegions(){
			var regions = {}
			publishers.forEach(function(publisher){
				regions[publisher.identifier] = '.tab-pane#'	+ publisher.identifier						
			})
			return regions		
		}

		var PublisherContainer = Backbone.Marionette.Layout.extend({				
			template : constructTemplate(),
			initialize : function(options){		
				if (options && options.wall){
					this.wall = options.wall
					this.identifier = options.identifier
				}	
			},
			regions : constructRegions(),				
			onRender : function(){
				var self = this		
				$(function () {
					$('#publisher-tab a').click(function(e){
						e.preventDefault()
						$(this).tab('show')
					})				
					publishers.forEach(function(publisher){
						self[publisher.identifier].show(new publisher.view({
							container : self					
						}))
					})
					$('#publisher-tab a:first').tab('show')											
				})		
			}
		})	
		return PublisherContainer	
	}



	
})
