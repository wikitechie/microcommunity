define([
	'app',
	'models/index',
	'modules/publisher',
	'modules/stream',
	'views/sidebars/basic',
	'models/materials',
	'views/publishers/post'
], function(App, Models, publiserhModule, streamModule, basicSidebar, Materials, PostPublisher){

	App.addRegions({
		mainSidebar : '#main-sidebar-region',
		//wikisSidebar : '#wikis-sidebar-region',
		materialsSidebar : '#materials-sidebar-region',
		publisher : '#publisher-region',
		stream : '#stream-region'
	})
	
	App.mainSidebar.show(new basicSidebar({
		header : 'Navigation',
		links : [ {label : 'Main', url : '/' } ]
	}))	
	
	/*var wikisLinks = [], materialsLinks = []
	var wikis = new Wikis(server.data.wikis)
	
	
	wikis.forEach(function(wiki){
		wikisLinks.push({ label : wiki.get('name'), url : wiki.link() })
	})	
	wikisLinks.push({ label : 'All wikis', url : '/wikis' })*/
	
	var materialsLinks = []
	var materials = new Materials(server.data.materials)
	materials.forEach(function(material){
		materialsLinks.push({ label : material.get('name'), url : material.link() })
	})
	materialsLinks.push({ label : 'All materials', url : '/materials' })	
		
	/*App.wikisSidebar.show(new basicSidebar({
		header : 'Wikis',
		links : wikisLinks
	}))*/
	
	App.materialsSidebar.show(new basicSidebar({
		header : 'Materials',
		links : materialsLinks
	}))	
	
	if (App.isLoggedIn()){
		var options = {
			wall : App.currentUser.get('wall'),
			identifier : 'user-wall',
			publishers : [PostPublisher]
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}

	var options = { items : server.data.items, type : 'stream' }	
	var Stream = streamModule(App, App.stream, options)		
		
	return App
	
});

