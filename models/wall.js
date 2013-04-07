var mongoose = require('mongoose');
var dbref = require("mongoose-dbref");
var loaded = dbref.install(mongoose);
var _ = require('underscore')

var wallSchema = new mongoose.Schema({
	owner : { type : mongoose.Schema.Types.DBRef },
})


module.exports = mongoose.model('Wall', wallSchema);

