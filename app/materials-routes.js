var microcommunity = require('microcommunity')
	, Container = microcommunity.model('Container')
	, Material = microcommunity.model('Material')
	, Wall = microcommunity.model('Wall')	
	, Stream = microcommunity.model('Stream')
	, Post = microcommunity.model('Post')
	, Wikipage = microcommunity.model('Wikipage')
	, File = microcommunity.model('File')

function saveThumbnail(file, callback){
	if (file.name !== ''){
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
	} else {
		callback(null)
	}		
}

exports.new =  function(req, res){
	res.loadPage('materials/new')
}

exports.create = function(req, res){
	saveThumbnail(req.files.thumbnail, function(filePath){		
		var container = new Material({
			name : req.body.name,
			description : req.body.description
		})			
		if (filePath) container.thumbnailPath = filePath			
		container.save(function(err){						
			//making the creator the default admin		
			container.newMembership(req.user)
			container.addRole(req.user, 'mc:admin')	
			container.addRole(req.user, 'mc:member')	
			container.save(function(err){
				res.redirect('/materials/' + container.id)
			})						
		})			
	})		
}


exports.members = function(req, res){
	req.container.populateMemberships(function(err, material){
		res.loadPage('materials/members', {
			material : material
		})			
	})			
}

exports.settings = function(req, res){		
		res.loadPage('materials/settings', {
			material : req.container
		})		
}

exports.show = function(req, res){
	Wikipage.find({ container : req.container.id }).exec(function(err, wikipages){
		File.find({ container : req.container.id }).exec(function(err, files){
			res.loadPage('materials/show', {
				material : req.container,
				wikipages : wikipages,
				files : files
			})
		})		
	})	
}

exports.wall = function(req, res){
	Wall.loadItems(req.container.wall, function(err, items){
		res.loadPage('materials/wall', {
			material : req.container,
			items : items
		})				
	})
}

exports.stream = function(req, res){
	Stream.loadItems(req.container.stream, function(err, items){
		res.loadPage('materials/stream', {
			material : req.container,
			items : items
		})				
	})
}

exports.index = function(req, res){
	Material.find({ containerType : 'material' }).exec(function(err, containers){
		res.loadPage('materials/index', { containers : containers })	
	})
}
