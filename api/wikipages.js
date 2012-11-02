var provider = require('./../providers/wikipages-provider')
	, database = require('./../providers/db');	
	
exports.create = function(req, res){

	var attr = {
		displayName: req.body.displayName, 
    content: req.body.content,
    published : Date(),
    author : req.body.author,
    parent : req.body.parent
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
    content: req.body.content,
    published : new Date(),
    summary : req.body.summary,
    diff : req.body.diff,
    author : req.body.author
	};  	
	
	provider.updateWikiPage(req.params.wikipage, updated_wikipage, function(err, wikipage){
		return res.send(wikipage); 	
	}); 
	
}



