define([
	'bb',
	'components/question/models/answer',
], function(Backbone, Answer){

	var Answers = Backbone.Collection.extend({
		model : Answer,
		comparator : function(a, b){
			if (a.get('votesCount') < b.get('votesCount'))
				return 1
			else if (a.get('votesCount') > b.get('votesCount'))
				return -1
			else 
				return 0		
		}
	})	
	return Answers
	
})
