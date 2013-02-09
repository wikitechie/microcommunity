var Collection = require('./../collection')
	, ObjectId = require('mongodb').ObjectID

function Walls(db){
	Collection.call(this, db, 'walls') 
}

Walls.prototype = Collection.prototype

module.exports = Walls
