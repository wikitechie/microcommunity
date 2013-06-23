define([
	'bb',
	'models/index',
	'models/membership',
	'views/sidebars/basic',
	'views/sidebars/sidebars',
	'models/materials',
	'can'
], function(Backbone, Models, Membership, basicSidebar, SidebarsView, Materials, can){


	var MCApp = Backbone.Marionette.Application.extend({
		setup : function(){
			this.currentUser = Models.User.findOrCreate(server.currentUser)
			
			this.currentContainer = server.currentContainer			
			if (server.containerMembership){
				this.containerMembership = new Membership(server.containerMembership)
				this.containerMembership.set('container', this.currentContainer.id)
			}
		},		
		isLoggedIn : function(){
			if (this.currentUser) return true
			else return false
		},
		
		isValidRole : function(testRole){		
			var result  = _.find(this.currentContainer.roles, function(role){ return (role === testRole) })
			if (typeof result === 'undefined')
				return false
			else
				return true
		},		
		hasContainerMembership : function(){
			if (this.isLoggedIn() && this.currentContainer && this.containerMembership) return true
			else return false
		},
		isContainerMember : function(){ return this.hasContainerRole('mc:member')},
		isContainerAmin : function(){ return this.hasContainerRole('mc:admin') },
		hasContainerRole : function(testRole){
			if (this.hasContainerMembership()){
				if (!this.isValidRole(testRole)){
					return false
				} else {
					var result = _.find(this.containerMembership.get('roles'), function(userRole){ 
						return (userRole === testRole) 
					})
					if (typeof result === 'undefined')
						return false
					else
						return true
				}
			} else {
				return false
			}
		},
		can : can
				
	})
	
	var App = new MCApp()
	App.setup()
	
	App.addRegions({
		sidebar : '#sidebar-region'
	})
	
	var sidebars = new Backbone.Collection(server.sidebars)		

	App.addInitializer(function(){
		App.sidebar.show(new SidebarsView({ collection : sidebars }))	
	})	
	
	
	return App
})
