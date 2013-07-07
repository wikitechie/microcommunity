define([
	'bb',
	'text!templates/homework.html',
	'views/submission-modal'	
], function(Backbone, html, SubmissionModal){

	var ViewSubmissionsButton = Backbone.Marionette.ItemView.extend({
		serializeData : function(){
			return this.model.serialize()
		},
		template : "<a href='<%= link %>/submissions' class='btn btn-primary'>View Submissions</a>"
	})
		
	var NewSubmissionButton = Backbone.Marionette.ItemView.extend({
		template : "<a class='btn btn-primary btn-submission'>Submit</a>",
		events : {
			'click .btn-submission' : 'submissionModal'
		},		
		submissionModal : function(e){
			e.preventDefault()
			var modal = new SubmissionModal({ model : this.model })
			modal.show()
		}		
	})	
	
	var HomeworkView = Backbone.Marionette.Layout.extend({	
		template : html	,
		serializeData : function(){
			return this.model.serialize()
		},
		regions : {
			buttons : '.btn-group'
		},
		onRender : function(){			
			if (App.isContainerAdmin()){
				this.buttons.show(new ViewSubmissionsButton({ model : this.model }))
			} else if (App.isContainerMember()) {
				this.buttons.show(new NewSubmissionButton({ model : this.model }))
			}
		}
	})	
	
	return HomeworkView	
})
