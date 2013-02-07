var Collection = require('./../collection')

function Activities(db){
	this.collectionName = 'activities'
	Collection.call(this, db, this.collectionName) 
}

Activities.prototype = Collection.prototype

module.exports = Activities
