var microcommunity = require('microcommunity')
	, Container = microcommunity.model('Container')
	, Material = microcommunity.model('Material')
	, Wall = microcommunity.model('Wall')	
	, Stream = microcommunity.model('Stream')
	, Post = microcommunity.model('Post')
	, Wikipage = microcommunity.model('Wikipage')
	, File = microcommunity.model('File')
	, Course = microcommunity.model('Course')
	, can = microcommunity.can
	, Course = microcommunity.model('Course')	
	, _ = require('underscore')

function saveThumbnail(file, callback){
	if (file.name !== ''){
		var path = require('path')
			, fs = require('fs')	
		var randomeName = path.basename(file.path)
		fs.readFile(file.path, function (err, data) {
			var relativePath = "/uploads/" + randomeName;
			var absolutePath = __dirname + '/static/' + relativePath
			fs.writeFile(absolutePath, data, function (err) {
				callback(relativePath)
			})
		})		
	} else {
		callback(null)
	}		
}


//courses

exports.coursesIndex =  function(req, res){ 
	Course.find().exec(function(err, courses){
		res.loadPage('courses', { courses : courses })
	})		
}

exports.createCourse =  function(req, res){ 

	saveThumbnail(req.files.thumbnail, function(filePath){	
		var course = new Course({ 
			year : req.body.year, 
			title : req.body.title,
			thumbnailPath : filePath
		})		
		course.save(function(err){
			res.redirect('/courses')
		})	
	})
		
}

//materials

exports.new =  function(req, res){

	var Course = microcommunity.model('Course')
	Course.find().exec(function(err, courses){
		res.loadPage('materials/new', { 
			currentSemester : currentSemester(),
			courses : courses
		})
	})
	
}

function currentSemester(){

	var currentTime = new Date()
	var year = currentTime.getFullYear()
	var month = currentTime.getMonth()
	
	var academicYear	
	if (month < 9){
		academicYear = year
	} else {
		academicYear = year - 1 
	}
	
	var season
	if (month > 1 && month < 7)
		season = 'spring'
	else 
		season = 'fall'
	
	return {
		academicYear : academicYear,
		season : season
	}
}

exports.create = function(req, res){

	Course.findById(req.body.course, function(err, course){
		var semester = {
			season : req.body.season,
			academicYear : req.body.academicYear
		}
		
		var container = new Material({
			courseTitle : course.title,
			description : req.body.description,
			semester : semester,
			course : course.id
		})
					
		container.save(function(err){						
			//making the creator the default admin		
			container.newMembership(req.user)
			container.addRole(req.user, 'mc:admin')	
			container.addRole(req.user, 'mc:member')	
			container.save(function(err){			
				req.user.follow(container)
				req.user.save(function(err){
					res.redirect('/materials/' + container.id)
				})				
			})						
		})	
	})

}


exports.members = function(req, res){
	req.container.populateMemberships(function(err, material){
		res.loadPage('materials/members', {
			material : material
		})			
	})			
}

exports.settings = function(req, res){		
		res.loadPage('materials/settings', {
			material : req.container
		})		
}

exports.show = function(req, res){
	Wikipage.find({ container : req.container.id }).exec(function(err, wikipages){
		File.find({ container : req.container.id }).exec(function(err, files){
			res.loadPage('materials/show', {
				material : req.container,
				wikipages : wikipages,
				files : files
			})
		})		
	})	
}

exports.wall = function(req, res){
	Wall.loadItems(req.container.wall, function(err, items){
		can.authorizeItems(items, req.user, function(err, items){
			req.container = req.container.toJSON()		
			can.authorize(req.container.wall, 'wall', 'publish', req.user, function(err, wall){
				res.loadPage('materials/wall', {
					material : req.container,
					items : items
				})		
			})					
		})			
	})
}

exports.stream = function(req, res){
	Stream.loadItems(req.container.stream, function(err, items){
		can.authorizeItems(items, req.user, function(err, items){
			res.loadPage('materials/stream', {
				material : req.container,
				items : items
			})
		})
	})
}

exports.index = function(req, res){	

	function loadMaterials(query){
		Material.find(query).exec(function(err, containers){
			Course.find().exec(function(err, courses){
				res.loadPage('materials/index', { 
					containers : containers, 
					courses : courses,
					params : req.query
				})	
			})		
		})	
	}

	var current = currentSemester()

	var query = {
		containerType : 'material'
	}
	var queryTitle = "Browse materials"
	
	if (req.query.academicYear)
		query['semester.academicYear'] = req.query.academicYear
	
	if (req.query.season == 'spring' || req.query.season == 'fall')
		query['semester.season'] = req.query.season
	
	if (!req.query.academicYear && !req.query.season) {	
		queryTitle = "Current semester"
		query['semester.academicYear'] = current.academicYear
		query['semester.season'] = current.season	
	}
	
	if (req.query.course)
		query.course = req.query.course
		
	if (req.query.year){
		Course.find({ year : req.query.year}, function(err, courses){
			var coursesIds = _.pluck(courses, "_id")
			query['course'] = { $in :  coursesIds }	
			loadMaterials(query)	
		})	
	} else {
		loadMaterials(query)
	}
	
	
	
}
