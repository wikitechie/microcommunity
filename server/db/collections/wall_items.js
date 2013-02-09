var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID
	, async = require('async')

function WallItems(db){
	var options = {
		DBRefs : [
			{ field : 'object' }
		]
	}
	Collection.call(this, db, 'wall_items', options) 
}

WallItems.prototype = Collection.prototype


WallItems.prototype.fetchWall = function(wall_id, callback){
	self = this
	self.find({ wall : wall_id }).limit(3).toArray(function(err, items){
		self.resolveArrayJoins(items, callback)
	})
}

module.exports = WallItems
