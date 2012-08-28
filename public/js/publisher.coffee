define [
	'jquery'
	'backbone'
	'cs!publishers/post_publisher'
	'cs!publishers/wikipage_publisher'	
	'bootbox'
], ($, Backbone, PostPublisher, WikipagePublisher) ->
	class PublisherContainer extends Backbone.View
		el: '#publisher'
		template: _.template($('#publisher-container-template').html())

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

