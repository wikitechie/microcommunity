define([
	'bb',
	'text!components/revision/templates/diff.html',
], function(Backbone, html){

	var DiffView = Backbone.Marionette.ItemView.extend({	
		initialize : function(options){		
			if (options){
				this.itemView = options.itemView
				this.itemView.on('action:diff', this.toggle, this)
			}			
		},
		ui : {
			comparason : '.diff-comparison'
		},
		toggle : function(){
			this.ui.comparason.slideToggle()
		},
		template : html,
		onRender : function(){
			this.ui.comparason.hide()
		}	
	})
	
	return DiffView
	
})
