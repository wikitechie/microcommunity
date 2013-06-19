define([
	'app',
	'models/index',
	'modules/publisher',
	'modules/stream',
	'views/sidebars/basic',
	'models/materials',
	'views/publishers/post',
	'views/publishers/photo'	
], function(App, Models, publiserhModule, streamModule, basicSidebar, Materials, PostPublisher, PhotoPublisher){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		materialsSidebar : '#materials-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	App.mainSidebar.show(new basicSidebar({
		header : 'Navigation',
		links : [ {label : 'Main', url : '/' } ]
	}))	

	
	var materialsLinks = []
	var materials = new Materials(server.data.materials)
	materials.forEach(function(material){
		materialsLinks.push({ label : material.get('name'), url : material.link() })
	})
	materialsLinks.push({ label : 'All materials', url : '/materials' })	
		
	App.materialsSidebar.show(new basicSidebar({
		header : 'Materials',
		links : materialsLinks
	}))	
	
	if (App.isLoggedIn()){	
		var options = {
			wall : App.currentUser.get('wall'),
			publishers : [PostPublisher, PhotoPublisher]
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}

	var options = { items : server.data.items, type : 'stream' }	
	var Stream = streamModule(App, App.stream, options)		
		
	return App
	
});

