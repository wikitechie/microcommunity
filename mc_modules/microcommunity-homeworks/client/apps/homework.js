define([
	'app',
	'views/homework',
	'modules/publisher',
	'modules/stream',	
	'models/homework',
	'views/publishers/post',
], function(App, HomeworkView, publiserhModule, streamModule, Homework, PostPublisher){

	var homework = Homework.findOrCreate(server.data.homework)
		
	App.addInitializer(function(){	
		App.homework.show(new HomeworkView({ model : homework }))
	})
	
	SubmissionController = Marionette.Controller.extend({
		initialize : function(options){
			if (options && options.submission){
				this.submission = options.submission
			} else {
				this.submission = false
			}
		},
		addSubmission : function(submission){
			this.submission = submission
		},
		hasSubmitted : function(){
			if (!this.submission)
				return false
			else
				return true
		}
	})
	
	App.submission = new SubmissionController({ submission : server.data.submission })
	
	App.addRegions({
		homework : '#homework-region',
		publisher : '#publisher-region',
		wall : '#wall-region'	
	})
		
	if (homework.get('wall').can('publish')){
		var options = {
			wall : homework.get('wall'),
			publishers : [PostPublisher]
		}		
		var Publisher = publiserhModule(App, App.publisher, options)		
	}

	var options = { 
		items : server.data.items, 
		type : 'wall',
		wall : homework.get('wall')
	}
	var Stream = streamModule(App, App.wall, options)		
		
	return App
	
	
	return App
})
