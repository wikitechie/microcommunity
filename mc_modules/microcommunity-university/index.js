var microcommunity = require('microcommunity')

require('./models/material')

var app = module.exports = microcommunity.plugin(__dirname)
	, mongoose = require('mongoose')
	, Material = mongoose.model('Material')

app.get('/years', function(req, res){
	res.loadPage('years')
})

app.get('/years/:year', function(req, res){
	Material.find().exec(function(err, materials){
		res.loadPage('year', { materials : materials })
	})	
})

var wikiRoutes = require('./wikis')

app.get('/years/:year/materials/:material', function(req, res){
	wikiRoutes.show(req, res)
	//res.loadPage('material')
})


app.post('/years/:year/materials', function(req, res){
	var material = new Material({
		name : req.body.name,
		description : req.body.description
	})
	
	material.save(function(err){
		res.redirect('/years/' + req.params.year)
	})
	
})

