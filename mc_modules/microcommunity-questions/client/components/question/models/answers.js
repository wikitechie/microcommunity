define([
	'bb',
	'components/question/models/answer',
], function(Backbone, Answer){

	var Answers = Backbone.Collection.extend({
		model : Answer
	})	
	return Answers
	
})
