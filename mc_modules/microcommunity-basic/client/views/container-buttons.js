define([
	'bb',
	'text!templates/group-header.html',
	'models/membership',
	'text!templates/container-settings-button.html',
	'models/request',
	'views/membership-requests-modal'
], function(Backbone, html, Membership, dropdownHtml, Request, MembershipRequestsModal){	

	var ParticipateButton = Backbone.Marionette.ItemView.extend({
		tagName : "button",
		className : "btn btn-primary btn-small",
		events : {
			'click' : 'click'
		},
		click : function(){ 
			if (!this.isDisabled()){
				var membership = new Membership({ 
					container : this.model.id,
					user : App.currentUser.id
				})
				var self = this
				membership.save({}, {
					success : function(model, response, options){
						self.model.set(model)
						self.disable()
					}	
				})			
			}
		},
		template : "Participate",
		onRender : function(){
			var result = _.find(this.model.get('requests'), function(request){
				return (request.user._id == App.currentUser.id)
			})		
			if (result){
				$(this.el).html("Request Pending")
				$(this.el).addClass('disabled')
			}			
		},
		isDisabled : function(){
			return (App.isContainerMember())
		},
		disable : function(){
			$(this.el).addClass('disabled')	
			this.template = "Request pending!"
			this.render()	
		}
	})
	
	var RequestsButton = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			var Requests = Backbone.Collection.extend({ model : Request })
			var requests = new Requests(this.model.get('requests'))
			this.list = new MembershipRequestsModal({ model: this.model, collection : requests })	
		},
		tagName : 'a',
		className : 'btn btn-primary',
		template : "<span class=\"badge badge-info\"><%= count %></span>	 Requests",
		events : {
			'click' : 'click'
		},
		serializeData : function(){
			return { count : this.model.get('requests').length }
		},
		click : function(){
			this.list.show()
		}			
	})
	
	var SettingsButton = Backbone.Marionette.Layout.extend({
		template : dropdownHtml,
		events : {
			'click .leave-btn' : 'leave'
		},
		regions : {
			requestsButton : '.requests-btn-region'
		},
		leave : function(e){
			e.preventDefault()
			
			var modal = new Modal({
				ok : function(){
					App.containerMembership.destroy()
					window.location.href = '/'
				}
			})
			modal.show()			
		},
		onRender : function(){		
			if (App.isContainerAdmin()){		
				this.requestsButton.show(new RequestsButton({ model : this.model }))			
			}				
		}
	})	

	var ContainerButtons = Backbone.Marionette.Layout.extend({	
		template : "<div id='button-region'></div>",
		regions : {
			button : "#button-region"
		},		
		onRender : function(){
			if (App.isLoggedIn()){
				if (App.isContainerMember()){
					this.button.show(new SettingsButton({ model : this.model }))
				} else {
					this.button.show(new ParticipateButton({ model : this.model }))
				}	
			}
		}				
	})		
	
	return ContainerButtons	
})
