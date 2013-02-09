var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID

function WallItems(db){
	Collection.call(this, db, 'wall_items') 
}

WallItems.prototype = Collection.prototype

module.exports = WallItems
