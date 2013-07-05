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
		console.log(this.collection)
		return this.collection
	}	
}

Sidebars.prototype.disable = function(){
	this.disabled = true
}

module.exports = Sidebars
