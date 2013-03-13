define([
	'newmodels/user',
	'newmodels/item',
	'newmodels/subitems/post',	
	'newmodels/items',
	'newmodels/wall',
	'newmodels/activity',
	'newmodels/subactivities/post',
	'newmodels/subactivities/wikipage',	
	'newmodels/stream',			
	'backbone',
	'backbone-relational',	
], function(User, 
						Item, PostItem, Items, Wall,
						Activity, PostActivity, WikiPageActivity, Stream, 
						Backbone){
	
	describe('Activity Model', function(){	
	
		it('should work', function(){	

			var amjad = new User({name : 'Amjad', id : 'user-1' , wall : 'wall-1' })	
			var amjadWall = new Wall({	id : 'wall-1', owner : 'user-1'	})
			
			var ahmad = new User({name : 'Ahmad', id : 'user-2' , wall : 'wall-2' })	
			var ahmadWall = new Wall({	id : 'wall-2', owner : 'user-2'	})			
			
			var yaser = new User({name : 'Yaser', id : 'user-3' , wall : 'wall-3' })	
			var yaserWall = new Wall({	id : 'wall-3', owner : 'user-3'	})					
						
			//var post = new PostItem({ content : 'hello, world!' })
			
			//receiving a created post item			
			amjadWall.get('items').add({ 
				id : 'item-1', 
				content : 'Hey Amjad, How are you!', 
				subtype : 'post' 
			})
			
			ahmadWall.get('items').add({ 
				id : 'item-2', 
				content : 'Hello Ahmad!', 
				subtype : 'post' 
			})					
			
			yaserWall.get('items').add({ 
				id : 'item-3', 
				content : 'Hello Myself!', 
				subtype : 'post' 
			})			
						
			
			var post1 = amjadWall.get('items').last()
			var post2 = ahmadWall.get('items').last()		
			var post3 = yaserWall.get('items').last()	
			
			
			WikiPage = Backbone.RelationalModel.extend()	
			
			var page = new WikiPage({
				id : 'wikipage-1',
				title : "Node.js",
				objectType : 'wikipage',			
			})
			var wikipageWall = new Wall({	id : 'wall-4'	})		
			
			var stream = new Stream([
				{ id : 'activity-1', subtype : 'post', actor : yaser , object : post1 },
				{ id : 'activity-2', subtype : 'post', actor : yaser , object : post2 },	
				{ id : 'activity-3', subtype : 'post', actor : yaser , object : post3 },
				{ id : 'activity-4', subtype : 'wikipage', actor : yaser, object : page  },
//{ id : 'activity-5', type : 'revision', actor : yaser , item : wikipage ? item },
			])
			
			wikipageWall.get('items').add({
				id : 'item-0',
				subtype : 'activity'
			})						
			
			stream.forEach(function(item){
				console.log(item.msg())
				//console.log(JSON.stringify( item.toJSON()))
				console.log(item.get('object').toJSON())

			})
	
			
		})	
		
	})	


})
