define([
	'bb',
	'text!components/question/templates/answers.html',
	'text!components/question/templates/answer.html',
	'text!components/question/templates/answer-form.html',
	'text!components/question/templates/vote-controls.html',	
	'components/question/models/answer',	
	'components/question/models/answers'
], function(Backbone, html, answerHtml, answerFormHTML, voteControlsHtml, Answer, Answers){


	var Vote = Backbone.Model.extend({
		urlRoot : function(){
			return '/api/questions/' + this.get('question') + '/answers/' + this.get('answer') + '/votes'
		}
	})
	
	var Verify = Backbone.Model.extend({
		urlRoot : function(){
			return '/api/questions/' + this.get('question') + '/answers/' + this.get('answer') + '/verify'
		}
	})	
	
	var VoteControlsView = Backbone.Marionette.ItemView.extend({
		initialize : function(){
			this.model.on('change', this.render, this)
		},
		template : voteControlsHtml,
		attributes : { style : "text-align:center" },
		events : {
			'click .upvote' : 'upvote',
			'click .downvote' : 'downvote'
		},		
		vote : function(type){
			var self = this
			if (this.model.can('vote')){			
				var vote = new Vote({ 
					user : App.currentUser.id,				
					type : type, 
					answer : this.model.id, 
					question : this.model.get('parent').id
				})				
				vote.save({}, {
					success : function(model, res){
						self.model.set(res)
					}
				})			
				return true
			}
		},
		upvote : function(e){ e.preventDefault(); this.vote('up') },
		downvote : function(e){  e.preventDefault(); this.vote('down') },		
		onRender : function(){
			if (App.isLoggedIn()){
				var vote =_.find(this.model.get('votes'), function(vote){ return (vote.user == App.currentUser.id) })
				if (vote){
					if (vote.value === 'up') {
						this.$('.upvote').css('color', 'green')
					} else if (vote.value === 'down') {
						this.$('.downvote').css('color', 'red')					
					}
				}
			}
				
		}		
	})

	var AnswerView = Backbone.Marionette.Layout.extend({
		template : answerHtml,
		regions : {
			voteControls : '.vote-controls-region'
		},
		serializeData: function(){
			return _.extend(this.model.serialize())
		},
		onRender : function(){
			this.voteControls.show(new VoteControlsView({ model : this.model }))
		}		
	})
		
	var AnswersListView = Backbone.Marionette.CompositeView.extend({
		itemView : AnswerView,
		template : '',
		appendHtml : function(collectionView, itemView, index){
			if (!itemView.model.isNew()) {
				$(collectionView.el).append(itemView.el)				
			}
		}			
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
			input : '.content',
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
			var	 answers = this.model.get('answers')
			this.answersList.show(new AnswersListView({ collection : answers }))
			if (this.model.can('answer')){
				var options = { model : this.model, collection : answers, author : App.currentUser }			
				this.answersForm.show(new AnswersForm(options))			
			}
		}	
	})
	
	return AnswersThreadView	
	
})
