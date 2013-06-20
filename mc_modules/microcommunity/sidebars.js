function Sidebars(){
	this.collection = [] 
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
	return this.collection
}

module.exports = Sidebars
