define([
	'bb',
	'text!templates/submissions.html',
	'text!templates/submission.html'				
], function(Backbone, html, submissionHtml){

	var SubmissionView = Backbone.Marionette.ItemView.extend({
		template : submissionHtml,
		serializeData : function(){
			return this.model.serialize()
		}
	})
	
	var SubmissionsView = Backbone.Marionette.CompositeView.extend({	
		itemView : SubmissionView,
		template : html,
		appendHtml: function(collectionView, itemView, index){
		  collectionView.$(".media-list").append(itemView.el);
		}
	})	
	
	return SubmissionsView	
})
