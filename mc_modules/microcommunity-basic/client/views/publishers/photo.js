define([
	'bb',
	'text!templates/publishers/photo.html',
	'jquery.fileupload'	
], function(Backbone, html){

	var PhotoPublisher = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			this.filePath = ''
		},
		template : html,						
		ui : {
			content : '#photo-content',
			file : '#file-upload',
			progress : '.progress',
			progressBar : '.progress .bar',			
			preview : '.preview'
		},
		events : {
			'click #post-content' : 'expand'
		},									
		exportData : function(){
			return {
				content : this.ui.content.val(),
				filePath : this.filePath
			}						
		},	
		reset : function(){
			this.ui.content.val("")
			this.ui.preview.html("")
		  this.ui.progressBar.css('width', '0%');				
		},		
		disable : function(){
			this.ui.content.prop("disabled", true)
		},		
		enable : function(){
			this.ui.content.prop("disabled", false)			
		},
		onRender : function(){
			var self = this
			this.ui.file.fileupload({
				done : function(e, data){
					data.result.files.forEach(function(file){
						self.ui.preview.html("<img src='"+file.url+"' />")
						self.filePath = file.url
					})				
				},
				progressall : function(e, data){
					var progress = parseInt(data.loaded / data.total * 100, 10);
		      self.ui.progressBar.css('width', progress + '%');
		      if (progress == 100){
			      self.ui.progress.removeClass('active')
		      }		      
				},
				add : function(e, data){
					var isImage = /^image/
					if (isImage.test(data.files[0].type)){
						data.submit()
					} else {
						alert("You should select an image")
					}					
				}
			})			
		},		
		expand : function(){
			this.ui.content.attr("rows","3")			
		}					
								
	})		
	
	return 	{ 
		objectType : 'photo', 
		icon : ' icon-camera-retro', 
		label : 'Photo', 
		view : PhotoPublisher 
	}		
	
})
