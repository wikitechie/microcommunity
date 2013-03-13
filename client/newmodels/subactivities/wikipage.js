define([
	'newmodels/activity',
	'backbone',
	'backbone-relational'
], function(Activity, Backbone){

	WikiPageActivity = Activity.extend({					
		msg : function(){					
			return this.get('actor').get('name') 
				+ ' created a wikipage titled ' 
				+ this.get('object').get('title')		
		}
	})	
	
	return WikiPageActivity
})
