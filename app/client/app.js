define([
	'bb',
	'models/index',
	'models/membership',
	'views/sidebars/basic',
	'views/sidebars/sidebars',
	'models/materials',
	'can',
	
	//modules for configuration
	'views/pin-attachement-modal',
	'models/material',
	'components/activity/model',	
	'componenets/new-file-activity/model',		
		
], function(Backbone, Models, Membership, basicSidebar, SidebarsView, Materials, can, PinAttachementModal, Material, NewWikipageActivity, NewFileActivity){


	var MCApp = Backbone.Marionette.Application.extend({
		setup : function(){
			this.currentUser = Models.User.findOrCreate(server.currentUser)
			this.site = server.site			
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
		isContainerAdmin : function(){ return this.hasContainerRole('mc:admin') },
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
		hasRole : function(role){
			if (!this.isLoggedIn()) return false			
			if (this.currentUser.get('role') == role) {return true} else {return false}
		},		
		isRootUser : function(){
			if (this.currentUser){
				if (this.currentUser.get('email') == this.site.rootUser)
					return true
				else
					return false
			} else {
				return false
			}
		}
				
	})
	
	var App = new MCApp()
	App.setup()
	
	if (server.sidebars){
		App.addRegions({
			sidebar : '#sidebar-region'
		})	
		var sidebars = new Backbone.Collection(server.sidebars)
		App.addInitializer(function(){
			App.sidebar.show(new SidebarsView({ collection : sidebars }))	
		})	
	}	
	
	//App configurations
	//#TODO separate this part of file and make it dynamic
	
	function pinResourceMenuItem(resource, prototype){
		var menuItem = { 
			name : 'pin-outline', 
			label : 'Pin to outline...', 
			handler : function(model){	
				var material = Material.findOrCreate(server.currentContainer)				
				var pinAttachement = new PinAttachementModal({ 
					model : material, 
					resource : model.get(resource)
				})
				pinAttachement.show()				
			},
			condition : function(model){
				if (server.currentContainer && App.isContainerAdmin()) return true
				else return false
			}
		}
		
		if (!prototype.menu) prototype.menu = []
		prototype.menu.push(menuItem)
				
	}
	
	pinResourceMenuItem('wikipage', NewWikipageActivity.prototype)
	pinResourceMenuItem('file', NewFileActivity.prototype)	
	
	
	return App
})
