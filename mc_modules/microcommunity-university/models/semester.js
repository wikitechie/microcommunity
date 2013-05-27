var mongoose = require('mongoose')
	, models = require('microcommunity/models/index')
	, hasWall = require('microcommunity/models/plugins/haswall')	
	
var semesterSchema = new mongoose.Schema({
	materialName : String,
	year: Number,
	material : { type : mongoose.Schema.Types.ObjectId, ref : 'Material' }
})

semesterSchema.pre('init', function(next, doc){
	this.model('Material').populate(doc, 'material', next)	
})

semesterSchema.virtual('name').get(function(){
	return this.materialName + ' ' + this.year + '-' + (this.year+1)
})	

semesterSchema.plugin(hasWall, { displayNameAttribute : 'name' })

models.define('Semester', 'semester', 'semesters', semesterSchema)



