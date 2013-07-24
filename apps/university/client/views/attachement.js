define([
	'bb',
	'text!templates/attachement.html',
	'models/wikipage',
	'models/file'	
], function(Backbone, html, Wikipage, File){

	var AttachementView = Backbone.Marionette.ItemView.extend({
		template : html,	
		serializeData : function(){
			var link, thumbnail
			
			switch(this.model.get('object').$ref){
				case "wikipages":
					var wikipage = Wikipage.findOrCreate({ _id : this.model.get('object').$id })
					link = wikipage.link()
					thumbnailPath = '/wiki-icon.png'
				break;
				case "files":
					var file = File.findOrCreate({ _id : this.model.get('object').$id })
					link = file.link()
					thumbnailPath = '/file-icon.png'					
				break;
				default:
					thumbnailPath = '/attachment-icon.png'
				break;				
			}		
		
			return _.extend(this.model.toJSON(), {
				link : link,
				thumbnailPath : thumbnailPath,
			})
		}
	})
		
	return AttachementView	
})
