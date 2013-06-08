var mongoose = require('mongoose')
	, Material = mongoose.model('Material')
	, File = mongoose.model('File')

exports.show = function(req, res){
	File.findById(req.params.file, function(err, file){	
		res.loadPage('file', {
			file : file,
		})
	})
}

exports.new = function(req, res){
	Material.findById(req.params.material, function(err, material){
		res.loadPage('file-form', { 
			material : material,
			action : '/materials/' + req.params.material + '/files'			
		})		
	})
}

exports.create = function(req, res){	
	Material.findById(req.params.material, function(err, material){	
	
		var file = new File({
			name : req.body.name,
			description : req.body.description,
			material : material.id
		})
		
		file.save(function(err, file){	
			/* var activity = new FileActivity({
				author : req.user._id,
				walls : [material.wall],
				file : file.id,
				streams : [req.user.stream, material.stream]
			})		
			activity.save(function(err, activity){
				res.redirect('/files/' + file.id)				
			})*/
			
			res.redirect('/files/' + file.id)
			
		})
			
	})
}


