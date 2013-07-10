define([
	'bb',
	'text!components/question/templates/answers.html',
	'text!components/question/templates/answer.html',
	'text!components/question/templates/answer-form.html',
	'components/question/models/answer',	
	'components/question/models/answers'
], function(Backbone, html, answerHtml, answerFormHTML, Answer, Answers){

	var AnswerVView = Backbone.Marionette.ItemView.extend({
		template : answerHtml,
		serializeData: function(){
			return _.extend(this.model.serialize())
		}		
	})
		
	var AnswersListView = Backbone.Marionette.CompositeView.extend({
		itemView : AnswerVView,
		template : ''			
	})

	var AnswersForm = Backbone.Marionette.ItemView.extend({
		initialize : function(options){
			var opts = options || {}
			
			if (!options.author)
				throw "No author provided"
				
			this.author = options.author
			
		},
		serializeData : function(){
			return { author : this.author.serialize() }
		},
		template : answerFormHTML,
		events : {
			'keypress .content' : 'inputChange'
		},	
		ui : {
			input : '.content'
		},	
		inputChange : function(e){
			var code = e.keyCode
			if(code == 13) { //submit code
				e.preventDefault()
				this.submit()
			}
		},
		submit : function(){
			var answer = new Answer({
				author : App.currentUser.id,
				content : this.ui.input.val(),
				question : this.model.id
			})
			this.disable()			
			var self = this			
			answer.save({}, {
				success : function(model){ 
					self.collection.add(model)
					self.enable()
					self.reset()					
				},
				error : function(model, xhr, options){
					alert('error')
					self.enable()
				}				
			})
		},
		reset : function(){		
			this.ui.input.val("")
		},
		disable : function(){
			this.ui.input.prop("disabled", true)
		},		
		enable : function(){
			this.ui.input.prop("disabled", false)			
		}		
	})
	
	var AnswersThreadView = Backbone.Marionette.Layout.extend({
		template : html,
		regions : {
			answersList : '.answers-list-region',
			answersForm : '.answers-form-region'
		},
		onRender : function(){
			var answers = new Answers(this.model.get('answers'))
			//var answers = this.model.get('answers')
			this.answersList.show(new AnswersListView({ collection : answers }))
			if (this.model.get('canAnswer')){
				var options = { model : this.model, collection : answers, author : App.currentUser }			
				this.answersForm.show(new AnswersForm(options))			
			}
		}	
	})
	
	return AnswersThreadView	
	
})
