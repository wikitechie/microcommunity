define([
	'app',
	'models/homework',
	'views/homework',
	'views/submissions'
], function(App, Homework, HomeworkView, SubmissionsView){

	var homework = Homework.findOrCreate(server.data.homework)
		
	App.addInitializer(function(){	
		App.homework.show(new HomeworkView({ model : homework }))
		
		var Submission = Backbone.RelationalModel.extend({
			serialize : function(){
				return _.extend(this.toJSON(), { 
					student : this.get('student').serialize()
				})
			},
			relations : [
				{
					type : Backbone.HasOne,
					key : 'student',
					relatedModel : 'Core.User'
				},
			]
		})
		
		var Submissions = Backbone.Collection.extend({
			model : Submission
		})
		
		var submissions = new Submissions(server.data.homework.submissions)		
		
		App.submissions.show(new SubmissionsView({ collection : submissions }))
		
	})
	
	App.addRegions({
		homework : '#homework-region',
		submissions : '#submissions-region'
	})

	return App
	
})
