define([
	'bb',
	'text!components/activity/templates/wikipage-summary.html',
], function(Backbone, html){

	var WikipageSummaryView = Backbone.Marionette.ItemView.extend({
		template : html,
		events : {
			'click .read-more' : 'readMore'
		},
		summary : true,
		serializeData : function(){
			return _.extend(this.model.toJSON(), { summary : this.summary })
		},
		readMore : function(){
			this.summary = false
			this.render()
		}		
	})	
	
	return WikipageSummaryView
	
})
