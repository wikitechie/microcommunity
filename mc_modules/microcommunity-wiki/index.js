
var microcommunity = require('microcommunity')

var app = module.exports = microcommunity.plugin(__dirname)

app.get('/wiki', function(req, res){
	res.loadPage('wikipage')
})
