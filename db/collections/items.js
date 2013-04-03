var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID
	, async = require('async')

function Items(db){
	var options = {	
		relations : [		
			{
				type : 'DBRef',
				field: 'object'
			},
		]
	}
	Collection.call(this, db, 'items', options) 
}

Items.prototype = Collection.prototype

Items.prototype.fetchWall = function(wall_id, callback){
	var self = this
	self.find({ wall : wall_id }).limit(3).toArray(function(err, items){
		self.resolveArrayJoins(items, callback)
	})
}

module.exports = Items
