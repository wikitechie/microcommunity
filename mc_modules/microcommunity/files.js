

module.exports.saveFile = function(file, folder, callback){
	if (file.name !== ''){
		var path = require('path')
			, fs = require('fs')
			, mc = require('./index')	
		var randomeName = path.basename(file.path)
		fs.readFile(file.path, function (err, data) {
			var relativePath = folder + randomeName;
			var absolutePath = mc.path + '/static/' + relativePath
			fs.writeFile(absolutePath, data, function (err) {
				callback(relativePath)
			})
		})		
	} else {
		callback(null)
	}		
}

