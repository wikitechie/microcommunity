define([
	'bb',
	'models/item',
	'components/question/models/answer',
	'components/question/models/answers',						
	'components/question/views/question',
	'components/question/views/answers',
	'text!components/question/templates/wall-message.html',
	'text!components/question/templates/stream-message.html'	
], function(Backbone, Item, Answer, Answers, QuestionView, AnswersView, messageTemplateWall, messageTemplateStream){
	
	var Question = Item.extend({
		messageTemplate : function(type){
			if (type == 'wall')
				return messageTemplateWall
			else
				return messageTemplateStream
		},	
		serialize : function(){			
			var parent = Item.prototype.serialize.apply(this)		
			return _.extend(parent,{})
		},		
		contentView : QuestionView,
		pluginView : AnswersView,
		relations : [
			{
				type : Backbone.HasMany,
				key : 'answers',
				relatedModel : Answer,
				collectionType: Answers,			
				reverseRelation	: {
					key: 'parent',
					includeInJSON: false		
				}	
			}
		]
	})
			
	return Question
})
