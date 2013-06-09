var mongoose = require('mongoose')
	, Wikipage = mongoose.model('Wikipage')
	, Wall = mongoose.model('Wall')
	, Wiki = mongoose.model('Wiki')

module.exports = function(){

	app.container('/wikis', 'Wiki', 'wikis', function(req, res){
		Wiki.findById(req.params.id, function(err, wiki){
			Wikipage.findById(wiki.homePage, function(err, wikipage){
				Wall.loadItems(wikipage.wall, function(err, items){
					res.loadPage('wikis/show', { 
						wiki : wiki,
						wikipage : wikipage,
						items : items
					})		
				})		
			})		
		})
	})

}
