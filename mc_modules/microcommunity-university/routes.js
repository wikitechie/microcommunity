var mongoose = require('mongoose')
	, Material = mongoose.model('Material')
	, Wall = mongoose.model('Wall')	
	, Stream = mongoose.model('Stream')
	, Post = mongoose.model('Post')
	, Wikipage = mongoose.model('Wikipage')
	, File = mongoose.model('File')

module.exports = function(app){

	function saveThumbnail(file, callback){
		var path = require('path')
			, fs = require('fs')
	
		var randomeName = path.basename(file.path)
		fs.readFile(file.path, function (err, data) {
			var relativePath = "/uploads/" + randomeName;
			var absolutePath = __dirname + '/static/' + relativePath
			fs.writeFile(absolutePath, data, function (err) {
				callback(relativePath)
			})
		})	
	}

	app.get('/materials/new', function(req, res){
		res.loadPage('materials/new')
	})	

	app.post('/materials', function(req, res){
		saveThumbnail(req.files.thumbnail, function(filePath){	
			var container = new Material({
				name : req.body.name,
				description : req.body.description,
				thumbnailPath : filePath
			})			
			container.save(function(err){		
				var date = new Date()
				var currentYear = date.getFullYear()		
				res.redirect('/materials/' + container.id)
			})	
		})
	})


	app.post('/materials/:id/sections', function(req, res){
		var section = req.body
		Material.findByIdAndUpdate(req.params.id, { $push : { sections : section } }, function(err, material){	
			res.send(200, section)
		})
	})


	app.get('/materials/:id', function(req, res){
		Wikipage.find({ container : req.params.id }).exec(function(err, wikipages){
			File.find({ container : req.params.id }).exec(function(err, files){
				Material.findById(req.params.id, function(err, material){	
					res.loadPage('materials/show', {
						material : material,
						wikipages : wikipages,
						files : files
					})
				})
			})		
		})	
	})

	app.get('/materials/:id/wall', function(req, res){
		Material.findById(req.params.id, function(err, material){	
			Wall.loadItems(material.wall, function(err, items){
				res.loadPage('materials/wall', {
					material : material,
					items : items
				})				
			})
		})
	})

	app.get('/materials/:id/stream', function(req, res){
		Material.findById(req.params.id, function(err, material){	
			Stream.loadItems(material.stream, function(err, items){
				res.loadPage('materials/stream', {
					material : material,
					items : items
				})				
			})
		})
	})

	app.get('/materials', function(req, res){
		Material.find({ containerType : 'material' }).exec(function(err, containers){
			res.loadPage('materials/index', { containers : containers })	
		})
	})

}
