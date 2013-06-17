define([
	'bb',
	'text!templates/course-header.html',
	'models/membership',
	'text!templates/container-settings-button.html',
	'views/modal'
], function(Backbone, html, Membership, dropdownHtml, Modal){	

	var ParticipateButton = Backbone.Marionette.ItemView.extend({
		tagName : "button",
		className : "btn btn-primary btn-small",
		events : {
			'click' : 'click'
		},
		click : function(){ 
			if (!this.isDisabled()){
				var membership = new Membership({ 
					material : this.model.id,
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
			if (this.isDisabled()){
				$(this.el).addClass('disabled')
			}
		},
		isDisabled : function(){
			return (App.isContainerMember())
		},
		disable : function(){
			$(this.el).addClass('disabled')	
			this.template = "You are a member now!"
			this.render()	
		}
	})
	
	var SettingsButton = Backbone.Marionette.CompositeView.extend({
		template : dropdownHtml,
		events : {
			'click .leave-btn' : 'leave'
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
		}
	})	

	var CourseHeader = Backbone.Marionette.Layout.extend({	
		template : html,
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
	
	return CourseHeader	
})
