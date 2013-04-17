var mongoose = require('mongoose')
	, models = require('./index')

var wikipageSchema = new mongoose.Schema({
	title: String,
	wall : { type : mongoose.Schema.Types.ObjectId, ref: 'Wall'}
})
