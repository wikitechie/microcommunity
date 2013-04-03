var ModelConstructor = require('./model')
	, db = require('./db/db')	

function ModelsStoreConstructor(){
	//private static members
	var models = {}	
	var ModelsStore = function(){}
	
	//public static methods
	ModelsStore.model = function(modelName, collectionName){
		if (!models.hasOwnProperty(modelName)){
			models[modelName] = new ModelConstructor(modelName, collectionName)
		}
		return models[modelName]		
	}
	
	return ModelsStore
}


db.connect(function(){

	var store = new ModelsStoreConstructor()	
	var Author = store.model('Author', 'authors')
	
	Author.pre('save', function(){
		console.log(this.toJSON())
	})

	Author.post('save', function(){
		console.log(this.toJSON())
	})

	var author = new Author({ name : 'Amjad' })
	
	var author2 = new Author({ name : 'Amjad' })	
		
	author.save(function(){	})
	
	console.log(Author.count())	

}) 
