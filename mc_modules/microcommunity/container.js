var _ = require('underscore')

var mongoose = require('mongoose')
	, Wall = mongoose.model('Wall')
	, Stream = mongoose.model('Stream')

function Container(Model, viewsPath){

	this.wall = function(req, res){
		Model.findById(req.params.id, function(err, container){
			Wall.loadItems(container.wall, function(err, items){
				res.loadPage(viewsPath + '/wall', { 
					container : container, 
					items : items
				})
			})		
		})	
	}	
	
	this.stream = function(req, res){
		Model.findById(req.params.id, function(err, container){
			Stream.loadItems(container.stream, function(err, items){
				res.loadPage(viewsPath + '/stream', { 
					container : container, 
					items : items
				})
			})		
		})	
	}

	this.index = function(req, res){
		Model.find().exec(function(err, containers){
			res.loadPage(viewsPath + '/index', { containers : containers })	
		})
	}

	this.create = function(req, res){	
		var container = new Model({
			name : req.body.name,
			description : req.body.description
		})	
		container.save(function(err){		
			res.redirect('/' + viewsPath )
		})
	}	
	
	
}



module.exports = Container
