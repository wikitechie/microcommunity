define([
	'bb',
	'text!templates/comments.html',
	'text!templates/comment.html',
	'text!templates/comment-form.html',	
	'models/comment'
], function(Backbone, html, commentHTML, commentFormHTML, Comment){

	var CommentView = Backbone.Marionette.ItemView.extend({
		template : commentHTML,
		serializeData: function(){
			return _.extend(this.model.serialize())
		}		
	})	
	var CommentsList = Backbone.Marionette.CompositeView.extend({
		itemView : CommentView,
		template : ''			
	})	

	var CommentsForm = Backbone.Marionette.ItemView.extend({
		initialize : function(options){
			var opts = options || {}
			
			if (!options.commenter)
				throw "No commenter provided"
				
			this.commenter = options.commenter
			
		},
		serializeData : function(){
			return { commenter : this.commenter.serialize() }
		},
		template : commentFormHTML,
		events : {
			'keypress .comment-content' : 'inputChange'
		},	
		ui : {
			input : '.comment-content'
		},	
		inputChange : function(e){
			var code = e.keyCode
			if(code == 13) { //submit code
				e.preventDefault()
				this.submit()
			}
		},
		submit : function(){
			var comment = new Comment({
				author : App.currentUser.id,
				content : this.ui.input.val(),
				item : this.model.get('item')
			})
			this.disable()			
			var self = this			
			comment.save({}, {
				success : function(model){ 
					self.collection.add(model)
					self.enable()
					self.reset()					
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
	
	CommentsThreadView = Backbone.Marionette.Layout.extend({
		template : html,
		regions : {
			commentsList : '.comments-list-region',
			commentsForm : '.comments-form-region'
		},
		onRender : function(){
			var comments = this.model.get('comments')
			this.commentsList.show(new CommentsList({ collection : comments }))			
			if (App.isLoggedIn()){
				var options = { model : this.model, collection : comments, commenter : App.currentUser }			
				this.commentsForm.show(new CommentsForm(options))			
			}
		}
	})
	
	return CommentsThreadView	
	
})
