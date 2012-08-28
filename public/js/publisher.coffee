define [
	'jquery'
	'backbone'
	'cs!publishers/post_publisher'
	'cs!publishers/wikipage_publisher'	
	'cs!views/new_group_box'
	'bootbox'
], ($, Backbone, PostPublisher, WikipagePublisher, NewGroupBox) ->
	class PublisherContainer extends Backbone.View
		el: '#publisher'
		template: _.template($('#publisher-container-template').html())
		
		events : 
			'click .group-create' : 'newGroup'

		initialize: ->
			@render()
			@addPublisher "post", "Post", new PostPublisher
			@addPublisher "wikipage", "Wiki", new WikipagePublisher
			#@addPublisher "question", "Question", new QuestionPublisher
			#@addPublisher "link", "Link", new LinkPublisher

			$('#publisher-tab a').click (e) ->
				e.preventDefault();
				$(this).tab('show')
			$('#publisher-tab a:first').tab('show');

		addPublisher: (identifier, label, view)->
			$("#publisher-tab").append("<li><a href='##{identifier}'>#{label}</a></li>")
			element = $("<div class='tab-pane' id='#{identifier}'></div>").append view.render().el
			$("#publisher-content").append element
		
		render: ->
			$(@el).html @template
			@
			
		newGroup : ()->
			box = new NewGroupBox
				callback : (result)->
					if result	
						console.debug 'hey'
					else
						console.debug 'no'		


