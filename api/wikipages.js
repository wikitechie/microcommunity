var provider = require('./../providers/wikipages-provider')
	, schemas = require('./../providers/mongoose-schemas')
	, mongoose = require('mongoose')
	, ObjectID = require('mongodb').ObjectID;
	
exports.index = function(req, res){
	provider.fetchWikiPages(function(err, wikipages){
		return res.send(wikipages);	
	});
};

exports.create = function(req, res){

	var attr = {
		title: req.body.title, 
    body: req.body.body,
    created_at : Date()
	};
	
	provider.createWikiPage(attr, function(err, new_wikipage){
		return res.send(new_wikipage);     
	});	  
	
};


exports.show = function(req, res){
	provider.fetch(req.params.wikipage, function(err, wikipage){
		return res.send(wikipage); 	
	});  
}

exports.update = function(req, res){	
	var updated_wikipage = {
		title: req.body.title, 
    body: req.body.body,
    created_at : req.body.created_at,
    current_revision: new ObjectID("501677e892b0ee87c6c98cc0")
	};  
	
	provider.updateWikiPage(req.params.wikipage, updated_wikipage, function(err, wikipage){
		return res.send(updated_wikipage); 	
	});  
}



