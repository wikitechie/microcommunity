
var microcommunity = require('microcommunity')
	, mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')

var app = module.exports = microcommunity.plugin(__dirname)

app.get('/wiki/:id', function(req, res){

	Wikipage.findById(req.params.id, function(err, wikipage){		
		Wall.loadItems(wikipage.wall, function(err, wall){		
			res.loadPage('wikipage', {
				wikipage : wikipage,
				items : wall.items 				
			})
		})
	})
	

})
