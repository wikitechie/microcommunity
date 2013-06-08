define([
	'bb',
	'text!templates/new-attachement-modal.html',
	'models/attachement',
	'models/wikipages'
], function(Backbone, html, Attachement, Wikipages){	
	
	var OptionView = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : '<%= title %>',
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}
	})
	
	var WikipagesSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		template : '',
		events : {
			'click' : 'selected'
		},		
		itemView : OptionView,
		selected : function(){
			var id = $(this.el).find('option:selected').attr('value')
			return { id : id, type : 'wikipage' }
		}
	})	
	
	var NewAttachementModal = Backbone.Marionette.Layout.extend({	
		className : 'modal fade',
		events : {
			'click .modal-submit' : 'submit'
		},
		ui : {
			title : '.input-title',
			description : '.input-description',
			submit : '.modal-submit',
			cancel : '.modal-cancel',			
		},
		regions : {
			wikipagesSelect : '.wikipages-select-region'
		},
		onRender : function(){
			$(this.el).modal()
			var wikipages = new Backbone.Collection(server.data.wikipages)
			this.wikipagesSelect.show(new WikipagesSelect({ collection : wikipages }))
		},
		show : function(){
			this.render()
		},			
		submit : function(){ 
			this.disable()
			
			var section = this.model.collection.indexOf(this.model)
			var material = this.model.get('parent').id			
			
			var attachement = new Attachement({ 
				section : section,
				material : material,
				title : this.ui.title.val(),
				description : this.ui.description.val(),
				object : this.wikipagesSelect.currentView.selected()			
			})			
			
			var self = this			
			attachement.save({}, {
				success : function(model, response, options){
					$(self.el).modal('hide')
					self.model.get('attachements').add(attachement)
				}
			})				

		},	
		disable : function(){
			this.ui.description.prop("disabled", true)
			this.ui.title.prop("disabled", true)
			this.ui.submit.addClass('disabled')
			this.ui.cancel.addClass('disabled')			
			$(this.el).spin()
		},				
		template : html
	})		
	
	return NewAttachementModal	
})
