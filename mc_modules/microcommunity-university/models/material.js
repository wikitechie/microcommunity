var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	//, hasWall = require('microcommunity/models/plugins/haswall')
	//, hasStream = require('microcommunity/models/plugins/has-stream')	

var materialSchema = new mongoose.Schema({
	name: String,
	description : String,
	//homePage : { type : mongoose.Schema.Types.ObjectId, ref : 'Material' },
})

/* materialSchema.pre('save', function(next, doc){
	var material = mongoose.model('Material')
	var material = new Material({ title : 'Home', content : 'This is the home page' })
	var self = this
	material.save(function(err){
		if (err) throw err
		self.homePage = material.id
		next()		
	})
})*/

/*
materialSchema.post('save', function(doc){
	var material = mongoose.model('Material')
	Material.findByIdAndUpdate(doc.homePage, { $set : { wiki : doc.id } }, function(err, material){
		console.log(material)
	})
})*/

materialSchema.plugin(hasWall, { displayNameAttribute : 'name' })
materialSchema.plugin(hasStream)

models.define('Material', 'material', 'materials', materialSchema)
