define([
	'bb',
	'text!templates/comments.html',
	'text!templates/comment.html',
	'text!templates/comment-form.html',	
	'models/comment',
], function(Backbone, html, commentHTML, commentFormHTML, Comment){

	var DeleteButton = Backbone.Marionette.ItemView.extend({ 
		tagName : 'button',
		className : 'close',
		template : "&times;",
		events : {
			'click' : 'deleteButton'
		},
		deleteButton : function(e){
			e.preventDefault()
			if (confirm('Are you sure you want to delete this item?')){
				this.model.destroy({ wait : true })
			}
		}							
	})

	var CommentView = Backbone.Marionette.Layout.extend({
		template : commentHTML,
		serializeData: function(){
			return _.extend(this.model.serialize())
		},
		regions : {
			deleteComment : '.delete-comment-region'		
		}, 
		onRender : function(){
			if (this.model.can('delete'))
				this.deleteComment.show(new DeleteButton({ model : this.model }))		
		}
		
	})	
	var CommentsList = Backbone.Marionette.CompositeView.extend({
		itemView : CommentView,
		template : '',
		appendHtml : function(collectionView, itemView, index){
			//some models are added automatically by BackboneRelational before they are actually saved
			//so we just check if the model is new or not
			if (!itemView.model.isNew()) {
				$(collectionView.el).append(itemView.el)	
			}
		}					
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
				item : this.model.id
			})
			this.disable()			
			var self = this			
			comment.save({}, {
				success : function(model){ 
					self.collection.remove(model)				
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
	
	var CommentsThreadView = Backbone.Marionette.Layout.extend({
		initialize : function(options){
			if (options){
				this.itemView = options.itemView
				this.itemView.on('action:comment', this.toggle, this)
			}
		},
		template : html,
		regions : {
			commentsList : '.comments-list-region',
			commentsForm : '.comments-form-region'
		},
		onRender : function(){
			var comments = this.model.get('comments')
			
			if (comments.length > 0 || this.model.can('comment')){
				$(this.el).find('ul').prepend("<hr />")
			}
			
			this.commentsList.show(new CommentsList({ collection : comments }))
			if (this.model.can('comment')){
				var options = { model : this.model, collection : comments, commenter : App.currentUser }			
				this.commentsForm.show(new CommentsForm(options))			
			}
		},
		toggle : function(){
			$(this.el).slideToggle()
		},		
	})
	
	return CommentsThreadView	
	
})
