var microcommunity = require('microcommunity')
	, auth = microcommunity.auth
	, Course = microcommunity.model('Course')	


var express = require('express');
var router = new express.Router();

	
router.get('/', auth.ensureAuthenticated, auth.ensureRoot, function(req, res){ 
	Course.find().exec(function(err, courses){
		res.loadPage('courses', { courses : courses })
	})		
})

router.post('/', auth.ensureAuthenticated, auth.ensureRoot, function(req, res){ 

	microcommunity.files.saveFile(req.files.thumbnail, '/uploads/', function(filePath){	
		var course = new Course({ 
			year : req.body.year, 
			title : req.body.title,
			thumbnailPath : filePath
		})		
		course.save(function(err){
			res.redirect('/courses')
		})	
	})
		
})

module.exports = router

