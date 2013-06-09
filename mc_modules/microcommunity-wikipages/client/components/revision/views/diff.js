define([
	'bb',
	'text!components/revision/templates/diff.html',
], function(Backbone, html){

	var DiffView = Backbone.Marionette.ItemView.extend({	
		initialize : function(){
			this.on('action:diff', this.toggle, this)
		},
		ui : {
			comparason : '.diff-comparison'
		},
		toggle : function(){
			this.ui.comparason.slideToggle()
		},
		template : html,
		actions : [
			{ label : 'Difference', name : 'diff' }
		],
		onRender : function(){
			this.ui.comparason.hide()
		}	
	})
	
	return DiffView
	
})
