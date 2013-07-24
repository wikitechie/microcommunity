var globalSidebar = [
	{label : 'Home', url : '/' , icon: 'icon-home' },
	{label : 'Global stream', url : '/stream', icon : 'icon-rss-sign'  },	
	//{label : 'Browse Materials', url : '/materials', icon : 'icon-camera-retro' },	
]

function Sidebars(){
	this.collection = [] 
	this.disabled = false
}

function Sidebar(header, links){
	this.header = header
	this.links = links
}

Sidebars.prototype.pushSidebar = function(header, links){
	var sidebar = new Sidebar(header, links)
	this.collection.push(sidebar)
}

Sidebars.prototype.getSidebars = function(){
	if (this.disabled == true){
		return false
	} else {
		return this.collection
	}	
}

Sidebars.getGlobalSidebar = function(){
	return globalSidebar
}

Sidebars.setGlobalSidebar = function(sidebar){
	globalSidebar = sidebar
}

Sidebars.prototype.disable = function(){
	this.disabled = true
}

module.exports = Sidebars
