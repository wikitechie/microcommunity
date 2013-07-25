var defaultSidebar = [
	{label : 'Home', url : '/' , icon: 'icon-home' },
	{label : 'Global stream', url : '/stream', icon : 'icon-rss-sign'  }
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

Sidebars.getDefault = function(){
	return defaultSidebar
}

Sidebars.prototype.disable = function(){
	this.disabled = true
}

module.exports = Sidebars
