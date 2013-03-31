require([
	'models/core',
	'jquery',
	'backbone',
	'backbone-relational',
	'backbone-marionette'

], function(Core, $){

	var sandbox = new Backbone.Marionette.Region({
		el : '#sandbox'
	})
	
	var ItemView = Backbone.Marionette.ItemView.extend({
		template : '#item-template' 
	})
	
	var ItemsView = Backbone.Marionette.CompositeView.extend({
		template : '#items-template',
		itemView : ItemView,
		appendHtml : function(collectionView, itemView){
			collectionView.$('tbody').prepend(itemView.el)	
		}
	})
	
	var PublisherView = Backbone.Marionette.ItemView.extend({
		template : '#publisher-template',
		
		ui : {
			input : '#new-post'
		},
		
		events : {
			'click #publish-button' : 'newPost'
		},		
		newPost : function(data){
			MyApp.vent.trigger('post:new', {
				content : this.ui.input.val(),
				author : 'user-1'				
			})			
			this.reset()
		},
		reset : function(){
			this.ui.input.val("")
		}
	})
	
	var Layout = Backbone.Marionette.Layout.extend({
		template : '#layout-template',
		regions : {
			publisher : '#publisher',
			items : '#items'
		}
	})		
	
	MyApp = new Backbone.Marionette.Application({
		initializeLayout : function(){
				MyApp.layout = new Layout()	
				MyApp.mainRegion.show(this.layout)	
				MyApp.layout.publisher.show(new PublisherView())
				MyApp.layout.items.show(new ItemsView({	collection : this.wall.get('items') }))		
		}		
	})
		
	MyApp.addRegions({
		mainRegion : '#sandbox'
	})
	
	MyApp.addInitializer(function(options){
		MyApp.user = new Core.User(options.user)	
		MyApp.wall = new Core.Wall(options.wall)	
		
		MyApp.vent.on('post:new', function(post){
			console.log('new post')
			MyApp.wall.get('items').add(post)
		})
				
		MyApp.initializeLayout()		
	})	
	
	MyApp.start({
		wall : { 
			id : 'wall-1', 
			owner : 'user-1',
			items : [
				{
					id : 'item-1',
					content : "Hello, World!",
					author : 'user-1',
					itemType : 'post',
					createdAt : Date()
				}
			] 
		},
		user : { 
			name : 'Name', 
			id : 'user-1',
			email : 'isstaif@gmail.com'
		}
	})
	
	
		

	

	
		

	
});

