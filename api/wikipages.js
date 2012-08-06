var provider = require('./../providers/wikipages-provider');
	
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
    body: req.body.body,
    created_at : new Date(),
    summary : req.body.summary,
    diff : req.body.diff
	};  	
	
	
	provider.updateWikiPage(req.params.wikipage, updated_wikipage, function(err, wikipage){
		return res.send(wikipage); 	
	}); 
	
}



