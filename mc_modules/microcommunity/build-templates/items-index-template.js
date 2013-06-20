define([<%= paths %>], function(){

	var args = Array.prototype.slice.call(arguments)
	
	var index = 0
	var output = {}
	
	server.itemModulesInfo.models.forEach(function(model){
		output[model] = args[index]
		index++
	})
	
	return output
})
