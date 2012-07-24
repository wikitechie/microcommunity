var mongoose = require('mongoose');

exports.model = mongoose.model('Wikipage', new mongoose.Schema({
	title: String,
	body: String
}));

exports.fetch = function (wikipage, callback){
	exports.model.findById(wikipage, function(err, wikipage) {
		callback(err, wikipage);
	});	
}

exports.fetchWikiPages = function (callback){
	exports.model.find({}, function(err, wikipages) {
		callback(err, wikipages);
	});	
}

exports.createWikiPage = function(attr, callback){
  var wikipage = new exports.model(attr);
  wikipage.save(function(err) {
		callback(err, wikipage);
  });
}

exports.updateWikiPage = function(id, updated, callback){
	exports.model.update({_id : mongoose.Types.ObjectId(id)}, updated, function(err, wikipage){
		callback(err, wikipage);	
	});
}

