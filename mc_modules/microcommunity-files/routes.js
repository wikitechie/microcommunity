var mongoose = require('mongoose')
	, Container = mongoose.model('Container')
	, File = mongoose.model('File')
	, FileActivity = mongoose.model('NewFileActivity')

module.exports.setup = function(app, containers){

	exports.show = function(req, res){
		File.findById(req.params.file, function(err, file){	
			res.loadPage('file', {
				file : file,
			})
		})
	}

	exports.new = function(req, res){
		Container.findById(req.params.container, function(err, container){
			res.loadPage('file-form', { 
				container : container,
				action : '/' + containers + '/' + req.params.container + '/files'			
			})		
		})
	}

	exports.create = function(req, res){	
		Container.findById(req.params.container, function(err, container){	
	
			var file = new File({
				name : req.body.name,
				description : req.body.description,
				container : container.id
			})
		
			file.save(function(err, file){	
				var activity = new FileActivity({
					author : req.user._id,
					walls : [container.wall],
					file : file.id,
					streams : [req.user.stream, container.stream]
				})		
				activity.save(function(err, activity){
					res.redirect('/files/' + file.id)				
				})			
			})			
		})
	}
	
	app.get('/' + containers + '/:container/files/new', exports.new)
	app.post('/' + containers + '/:container/files', exports.create)
	app.get('/files/:file', exports.show)

}


