var util = require('util')
	, EventEmitter = require('events').EventEmitter
	, mongoose = require('mongoose')
	, _ = require('underscore')
	, async = require('async')

function Models(){}
util.inherits(Models, EventEmitter)

var registery = []

var index = {
	objects : {},
	collections : {},
	models : {}
}

Models.prototype.addModel = function (hash){
	var field = {
		object : hash.object,
		collection : hash.collection,
		model : hash.model 
	}	
	var i = registery.push(field) - 1
	
	index.objects[field.object] = i
	index.collections[field.collection] = i
	index.models[field.model] = i	
}

function validate(str){
	return (str ==  'object' || str == 'collection' || str == 'model')
}

Models.prototype.convert = function(string, from, to){
	if (validate(from) && validate(to)){
		from = from + 's'
		var i = index[from][string]
		return registery[i][to]	
	} else return 
}

var definitions = []

Models.prototype.define = function(modelName, objectType, collectionName, schema){
	schema.virtual('objectType').get(function(){ return objectType })	
	schema.set('toJSON', { virtuals: true })
	var Model = mongoose.model(modelName, schema, collectionName)	
	this.addModel({
		model : modelName, 
		object : objectType, 
		collection : collectionName
	})
	return Model	
}

Models.prototype.start = function(){
	mongoose.connect('mongodb://localhost/test')
}

var models = new Models()
models.items = require('./items')
module.exports = models

require('./stream')
require('./item')
require('./wall')
require('./user')
require('./container')

models.start()








