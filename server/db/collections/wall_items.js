var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID

function WallItems(db){
	Collection.call(this, db, 'wall_items') 
}

WallItems.prototype = Collection.prototype


WallItems.prototype.fetchWall = function(wall_id, callback){
	this.find({ wall : wall_id }).toArray(callback)
}

module.exports = WallItems
