var mongoose = require('mongoose')
	, microcommunity = require('microcommunity')
	
var courseSchema = new mongoose.Schema({
	title : String,
	year : { type : Number, min : 1, max : 5 }
})

module.exports = courseSchema
