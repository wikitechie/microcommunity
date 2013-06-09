var microcommunity = require('microcommunity')
	
require('./models/material')

var app = module.exports = microcommunity.plugin(__dirname)

var addPublisher = require('./material-publisher')
addPublisher(app)

var mongoose = require('mongoose')
	, Material = mongoose.model('Material')
	, Wall = mongoose.model('Wall')	
	, Stream = mongoose.model('Stream')
	, Post = mongoose.model('Post')
	, Wikipage = mongoose.model('Wikipage')
	, File = mongoose.model('File')
	, models = require('microcommunity/models')


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

app.post('/api/materials/:material/sections/:section/attachements', function(req, res){	

	var attachement = req.body
	var objectType = models.convert(req.body.object.type, 'object', 'collection')
	var objectId = req.body.object.id
	attachement.object = new mongoose.Types.DBRef(objectType, objectId)
	
	var section = req.params.section
	
	var sectionIndex = 'sections.' + section + '.attachements'
	
	var update = {}
	update[sectionIndex] = attachement
		
	Material.findByIdAndUpdate(
		req.params.material,
		{ $push : update }, 
		function(err, material){
			res.send(200, attachement)
	})
	
})

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

	Wikipage.find({ material : req.params.id }).exec(function(err, wikipages){
		File.find({ material : req.params.id }).exec(function(err, files){
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
	Material.find().exec(function(err, containers){
		res.loadPage('materials/index', { containers : containers })	
	})
})


var wikipagesRoutes = require('./wikipages')

app.get('/materials/:material/wikipages/new', wikipagesRoutes.new)
app.post('/materials/:material/wikipages', wikipagesRoutes.create)
app.get('/wikipages/:wikipage', wikipagesRoutes.show)

var filesRoutes = require('./files')

app.get('/materials/:material/files/new', filesRoutes.new)
app.post('/materials/:material/files', filesRoutes.create)
app.get('/files/:file', filesRoutes.show)




