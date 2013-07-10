define([
	'bb',
	'text!components/question/templates/question.html',
], function(Backbone, html){

	var QuestionView = Backbone.Marionette.ItemView.extend({	
		template : html
	})	
	return QuestionView
	
})
