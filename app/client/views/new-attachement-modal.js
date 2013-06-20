define([
	'bb',
	'text!templates/new-attachement-modal.html',
	'models/attachement',
	'models/wikipages'
], function(Backbone, html, Attachement, Wikipages){	
	
	var WikipageOptionView = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : '<%= title %>',
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}
	})
	
	var FileOptionView = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : '<%= name %>',
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}
	})	
	
	var ResourceSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		template : '',
		selected : function(){
			var id = $(this.el).find('option:selected').attr('value')
			return id
		}
	})
	
	var resourceTypeIndex = []	
		resourceTypeIndex[0] = { 
			id : 0, name : 'Wikipage', type : 'wikipage', array : server.data.wikipages, 
			view : WikipageOptionView
		}
		resourceTypeIndex[1] = { 
			id : 1, name : 'File', type : 'file', array : server.data.files, 
			view : FileOptionView 
		}	
	
	var ResourceTypeOptionView = Backbone.Marionette.ItemView.extend({
		tagName : 'option',
		template : '<%= name %>',
		onRender : function(){
			$(this.el).attr('value', this.model.id)
		}
	})		
	
	var ResourceTypeSelect = Backbone.Marionette.CompositeView.extend({
		tagName : 'select',
		template : '',
		events : {
			'click' : 'onSelected'
		},		
		itemView : ResourceTypeOptionView,
		onSelected : function(){
			var id = $(this.el).find('option:selected').attr('value')
			this.trigger('typeSelected', id)
		},
		selected : function(){
			var id = $(this.el).find('option:selected').attr('value')
			return resourceTypeIndex[id].type
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
			resourceSelect : '.resource-select-region',
			resourceTypeSelect : '.resource-type-select-region'			
		},
		onRender : function(){
			$(this.el).modal()
				
			function select(type, self){				
				var collection = new Backbone.Collection(resourceTypeIndex[type].array)			
				self.resourceSelect.show(new ResourceSelect({ 
					collection : collection ,
					itemView : resourceTypeIndex[type].view,
				}))			
			}
			
			select(0, this)
			
			var resourceTypes = new Backbone.Collection(resourceTypeIndex)			
			this.resourceTypeSelect.show(new ResourceTypeSelect({ collection : resourceTypes }))
			
			var self = this
			this.resourceTypeSelect.currentView.on('typeSelected', function(type){
				select(type, self)
			})
						
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
				object : {
					id : this.resourceSelect.currentView.selected(),
					type : this.resourceTypeSelect.currentView.selected()
				}
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
