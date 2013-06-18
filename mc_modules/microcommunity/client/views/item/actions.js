define([
	'bb'
], function(Backbone){

	var ActionView = Backbone.Marionette.ItemView.extend({
		tagName : 'span',
		className : 'action',
		events : {
			'click a' : 'click'
		},				
		template : '<a href=><%= label %></a> · ',
		click : function(e){
			e.preventDefault()
			this.model.collection.trigger(this.model.get('name'))
		}
	})				
	var ActionsView = Backbone.Marionette.CompositeView.extend({
		tagName : 'span',
		template : '',
		itemView : ActionView
	})

	return ActionsView	
})
