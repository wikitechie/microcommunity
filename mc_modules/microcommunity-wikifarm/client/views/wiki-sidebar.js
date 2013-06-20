define([
	'bb',
	'views/sidebars/basic',
	'models/wiki'
], function(Backbone, BasicSidebar, Wiki){

	return function(wikiJSON){
		var wiki = Wiki.findOrCreate(wikiJSON)
		return new BasicSidebar({
			header : wiki.get('name'),
			links : [ 
				{label : 'Home page', url : wiki.link() },
				{label : 'Community', url : wiki.link() + '/wall' }, 
				{label : 'All changes', url : wiki.link() + '/stream' }			 
			]
		})	
	}
})
