define([
	'bb',
	'text!components/activity/templates/content.html',
	'components/activity/views/wikipage-summary'
], function(Backbone, html, WikipageSummaryView){

	var ActivityView = Backbone.Marionette.Layout.extend({	
		template : html, 
		regions : {
			summary : '.wikipage-summary-region'
		},
		onRender : function(){
			this.summary.show(new WikipageSummaryView({ model : this.model.get('wikipage') }))
		}
	})
	
	return ActivityView
	
})
