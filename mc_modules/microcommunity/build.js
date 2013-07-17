var fs = require('fs')
	, _ = require('underscore')

var mergingFolder = "client-merged"

function mergeFiles(mcModules, path, callback){

	var destinationFolder = path + "/" + mergingFolder
	var commands = []	
	for(var i=0; i<mcModules.length; i++){
		var mcModule = mcModules[i]
		var command = "cp -R " + mcModule.basePath + "/client/* " + destinationFolder + '/'
		commands.push(command)
	}	
	var command = "cp -R " + __dirname + "/client/* " + destinationFolder + '/'
	commands.push(command)		
	
	var exec=require('child_process').exec
		, async = require('async')
	
	exec('mkdir ' + destinationFolder, function(err){	
		async.map(commands, exec, callback)	
	})		
}

function generateItemsIndex(mcModules, destinatinoPath, callback){

	var templateFile = __dirname + '/build-templates/items-index-template.js'
	var self = this
	fs.readFile(templateFile, 'utf8', function (err, template) {
		var paths = self.items.exportItemsModulesForClient().paths
		var newPaths = []
		for(var i=0; i<paths.length; i++){
			var path = paths[i]
			var newPath =  "\"" + path	+ "\""
			newPaths.push(newPath)	
		}
		var file = _.template(template)({ paths : newPaths.toString() })
		var itemsIndexPath = destinatinoPath + '/'+ mergingFolder +'/models/items-index.js'
		fs.writeFile(itemsIndexPath, file, callback)
	})
}

function generateBuildFile(mcModules, destinatinoPath, callback){
	var templateFile = __dirname + '/build-templates/build-template.js'
	fs.readFile(templateFile, 'utf8', function (err, template) {
		var modulesList = []
		for(var i=0; i<mcModules.length; i++){
			var mcModule = mcModules[i]			
			for(var j=0; j<mcModule.modules.length; j++){
				modulesList.push({ name : 'apps' + mcModule.modules[j].name })			
			}
		}
		var file = _.template(template)({ modules : JSON.stringify(modulesList) })
		var itemsIndexPath = destinatinoPath + '/' + mergingFolder + '/build.js'
		fs.writeFile(itemsIndexPath, file, callback)
	})
}

module.exports = function(destinationPath){

	this.mergeFiles = mergeFiles
	this.generateItemsIndex = generateItemsIndex
	this.generateBuildFile = generateBuildFile
	
	var self = this

	this.getClientModules(function(err, mcModules){
		self.mergeFiles(mcModules, destinationPath, function(err){	
			self.generateItemsIndex(mcModules, destinationPath, function (err) {
				if (err) throw err
				console.log('items-index.js written successfully to client-merged')
			})		
			self.generateBuildFile(mcModules, destinationPath, function (err) {
				if (err) throw err			
				console.log('build.js written successfully to client-merged')
			})	
		})
	})
}

