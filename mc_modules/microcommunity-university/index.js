var microcommunity = require('microcommunity')
	, addPublisher = require('semester-publisher')
	
require('./models/material')
require('./models/semester')

var app = module.exports = microcommunity.plugin(__dirname)

addPublisher(app)

var mongoose = require('mongoose')
	, Material = mongoose.model('Material')
	, Semester = mongoose.model('Semester')	
	, Wall = mongoose.model('Wall')	
	, Post = mongoose.model('Post')


app.get('/materials/:id', function(req, res){
	Material.findById(req.params.id, function(err, material){	
		Semester.find({ material : material.id }, function(err, semesters){
			res.loadPage('materials/show', {
				semesters : semesters,
				material : material
			})				
		})	
	})
})

app.get('/materials/:id/wall', function(req, res){
	Material.findById(req.params.id, function(err, material){	
		Semester.findById( material.currentSemester, function(err, semester){
			Wall.loadItems(semester.wall, function(err, items){
				res.loadPage('materials/wall', {
					semester : semester,
					material : material,
					items : items
				})				
			})			
		})	
	})
})

app.get('/materials', function(req, res){
	Material.find().exec(function(err, containers){
		res.loadPage('materials/index', { containers : containers })	
	})
})

app.post('/materials', function(req, res){	
	var container = new Material({
		name : req.body.name,
		description : req.body.description
	})	
	container.save(function(err){		
		var date = new Date()
		var currentYear = date.getFullYear()		
		var semester = new Semester({ 
			materialName : container.name,
			material : container.id,
			year : currentYear	
		})	
		semester.save(function(err){
			if (err) throw err		
			container.update({ $set : { currentSemester : semester.id }}, function(){			
				res.redirect('/materials')							
			})			
		})
	})
})


app.get('/materials/:material/semesters/new', function(req, res){
	Material.findById(req.params.material, function(err, material){	
		Semester.find({ material : material.id }, function(err, semesters){
			res.loadPage('semesters/new', {
				semesters : semesters,
				material : material
			})				
		})	
	})
})

app.post('/materials/:material/semesters', function(req, res){

	var semester = new Semester({
		material : req.params.material,
		year : req.body.year
	})
	
	semester.save(function(err){
		if (err) throw err				
		res.redirect('/materials/'+ req.params.material)
	})	
})

app.get('/materials/:material/semesters/:semester', function(req, res){
	Material.findById(req.params.material, function(err, material){	
		Semester.findById(req.params.semester, function(err, semester){
			Wall.loadItems(semester.wall, function(err, items){
				res.loadPage('materials/wall', {
					semester : semester,
					material : material,
					items : items
				})				
			})			
		})	
	})
})





