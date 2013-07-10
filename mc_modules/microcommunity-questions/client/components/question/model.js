define([
	'bb',
	'models/item',
	'components/question/views/question',
	'components/question/views/answers',
	'text!components/question/templates/wall-message.html',
	'text!components/question/templates/stream-message.html'	
], function(Backbone, Item, QuestionView, AnswersView, messageTemplateWall, messageTemplateStream){
	
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
		pluginView : AnswersView	
	})
			
	return Question
})
