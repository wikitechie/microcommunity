define([
	'bb',
	'models/index',
	'models/membership',
	'views/sidebars/basic'
], function(Backbone, Models, Membership, basicSidebar){

	var MCApp = Backbone.Marionette.Application.extend({
		setup : function(){
			this.currentUser = Models.User.findOrCreate(server.currentUser)
			this.containerMembership = new Membership(server.containerMembership)
			this.currentContainer = server.currentContainer			
			this.containerMembership.set('container', this.currentContainer.id)

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
	})
	
	var App = new MCApp()
	App.setup()
	
	App.addRegions({
		mainSidebar : '#main-sidebar-region'
	})	

	App.addInitializer(function(){
		App.mainSidebar.show(new basicSidebar({
			header : 'Navigation',
			links : [ 
				{label : 'Main', url : '/' },
				{label : 'Materials', url : '/materials' },
			]
		}))	
	})	
	
	
	return App
})
