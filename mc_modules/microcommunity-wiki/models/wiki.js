var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')
	, hasStream = require('microcommunity/models/plugins/has-stream')	

var wikiSchema = new mongoose.Schema({
	name: String,
	description : String,
	homePage : { type : mongoose.Schema.Types.ObjectId, ref : 'Wikipage' },
})

wikiSchema.pre('save', function(next, doc){
	var Wikipage = mongoose.model('Wikipage')
	var wikipage = new Wikipage({ title : 'Home', content : 'This is the home page' })
	var self = this
	wikipage.save(function(err){
		if (err) throw err
		self.homePage = wikipage.id
		next()		
	})
})


wikiSchema.post('save', function(doc){
	var Wikipage = mongoose.model('Wikipage')
	Wikipage.findByIdAndUpdate(doc.homePage, { $set : { wiki : doc.id } }, function(err, wikipage){
		console.log(wikipage)
	})
})

wikiSchema.plugin(hasWall, { displayNameAttribute : 'name' })
wikiSchema.plugin(hasStream)

models.define('Wiki', 'wiki', 'wikis', wikiSchema)
