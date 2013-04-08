var mongoose = require('mongoose');
var dbref = require("mongoose-dbref");
var loaded = dbref.install(mongoose);
var _ = require('underscore')

var itemSchema = new mongoose.Schema({
	object : { type : mongoose.Schema.Types.DBRef },
	wall : mongoose.Schema.Types.ObjectId,
	published : Date
})

module.exports = mongoose.model('Item', itemSchema);

