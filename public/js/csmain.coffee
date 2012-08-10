define [
	'jquery'
	'underscore'
	'backbone'
	'cs!router'
], ($, _, Backbone, router) ->
	'use strict'
	window.mediator = {}
	_.extend(window.mediator, Backbone.Events);
	appRouter = new router()
	Backbone.history.start()



