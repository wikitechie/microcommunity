define([
	'bb',
	'text!templates/wikipage.html',
	'text!templates/wikipage-buttons.html'	
],function(Backbone, html, buttons){

	var wikipageButtons = Backbone.Marionette.ItemView.extend({
		template : buttons
	})
	
	var WikipageView = Backbone.Marionette.Layout.extend({	
		template : html,
		regions : {
			buttons : '.buttons-region'
		}, 
		onRender : function(){
			if (App.currentUser)
				this.buttons.show(new wikipageButtons({ model : this.model }))
		}
	})	
	
	return WikipageView	
})
