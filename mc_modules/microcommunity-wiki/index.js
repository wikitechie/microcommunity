
var microcommunity = require('microcommunity')
	, mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')

var app = module.exports = microcommunity.plugin(__dirname)

app.get('/wiki/:id', function(req, res){
	Wikipage.findById(req.params.id, function(err, wikipage){	
		console.log(wikipage)	
		Wall.loadItems(wikipage.wall, function(err, wall){		
			res.loadPage('wikipage', {
				wikipage : wikipage,
				items : wall.items 				
			})
		})
	})
})

app.get('/new-wikipage', function(req, res){	
	res.loadPage('new-wikipage')
})

app.post('/new-wikipage', function(req, res){	
	var wikipage = new Wikipage({
		title : req.body.title,
		content : req.body.content
	})
	
	wikipage.save(function(err, wikipage){
		res.redirect('/wiki/' + wikipage.id)	
	})

})
