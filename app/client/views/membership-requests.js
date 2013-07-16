define([
	'bb',
	'text!templates/membership-requests.html',
	'text!templates/membership-request.html'
], function(Backbone, html, requestHtml){

	var RequestView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			this.model.set('material', this.options.material.id)
		},
		template : requestHtml,
		serializeData : function(){
			return this.model.serialize()
		},
		events : {
			'click .btn-ok' : 'approve',
			'click .btn-remove' : 'decline'		
		},
		approve : function(){
			var self = this
			this.model.save({ status : 'approved' }, {
				success : function(model){
					self.remove()						
				}
			})
		},
		decline : function(){
			var self = this
			this.model.save({ status : 'decline' }, {
				success : function(model){
					self.remove()					
				}
			})		
		}				
	})
	
	
	var RequestListView = Backbone.Marionette.CompositeView.extend({
		tagName : 'ul',
		template : '',
		className : 'media-list',
		itemView : RequestView,
		itemViewOptions : function(){
			return {
				material : this.model
			}
		}	 
	})
		
	return RequestListView	
})
