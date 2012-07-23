class window.WikiPage extends Backbone.Model
	defaults:
		title: "Backbone.js"
		body: "Backbone.js gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface. \
		\
		The project is hosted on GitHub, and the annotated source code is available, as well as an online test suite, an example application, a list of tutorials and a long list of real-world projects that use Backbone. Backbone is available for use under the MIT software license. \
		You can report bugs and discuss features on the GitHub issues page, on Freenode IRC in the #documentcloud channel, post questions to the Google Group, add pages to the wiki or send tweets to @documentcloud. "

	idAttribute: "_id"
	url: '/api/wikipages/'

	initialize: ->
		@comments = new Comments

class window.WikiPages extends Backbone.Collection
	model: window.WikiPage
	url: '/api/wikipages'

