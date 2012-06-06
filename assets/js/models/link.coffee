class window.Link extends Backbone.Model
	defaults:
		name: "Amjad"
		title: "What is 'Information Architecture'?"
		url: "http://www.guardian.co.uk/help/insideguardian/2010/feb/02/what-is-information-architecture"
		preview_thumbnail: "https://fbexternal-a.akamaihd.net/safe_image.php?d=AQBnnNTDupV9KD-W&w=90&h=90&url=http%3A%2F%2Fstatic.guim.co.uk%2Fsys-images%2FGuardian%2FPix%2Fpictures%2F2010%2F1%2F11%2F1263253794086%2F201001_iphone-ia-140.jpg"
		preview: "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/1/11/1263253879477/201001_iphone-ia.jpg"
		curation: "At a micro level this can mean deciding that products on a search page should be ordered by price rather than by name. On a larger scale it could be reorganising the content on a site to support some clear tasks that users want to perform. On a strategic level, an information architect might get involved in determining the way that articles and metadata are placed into a content management system."

	idAttribute: "_id"

	initialize: ->
		@comments = new Comments

class window.Links extends Backbone.Collection
	model: window.Link
	url: '/api/posts'

