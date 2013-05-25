var microcommunity = require('microcommunity')

require('./models/material')

var app = module.exports = microcommunity.plugin(__dirname)

var mongoose = require('mongoose')
	, Material = mongoose.model('Material')

app.container('/materials', 'Material', 'materials', function(req, res){

	Material.findById(req.params.id, function(err, material){
	
	res.loadPage('materials/show', {
		material : material
	})
		/*Wall.loadItems(wikipage.wall, function(err, items){
			res.loadPage('wikis/show', { 
				wiki : wiki,
				wikipage : wikipage,
				items : items
			})		
		})*/		
	})	



})


