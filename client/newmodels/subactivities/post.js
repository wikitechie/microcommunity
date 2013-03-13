define([
	'newmodels/activity',
	'backbone',
	'backbone-relational'
], function(Activity, Backbone){

	PostActivity = Activity.extend({		
			
		msg : function(){
		
			//console.log( this.wall().id )
			
			var msg
			
			if ( this.get('object').get('parentWall').id == this.get('actor').get('wall').id )	
				msg = ' posted on his wall '
			else
				msg = ' posted on ' + this.get('object').get('parentWall').get('owner').get('name') + '\'s wall '
				
			return this.get('actor').get('name') 
				+ msg 
				+ this.get('object').get('content')
		
		}
	})	
	
	return PostActivity
})
