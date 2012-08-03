require([
	'cs!/models/post',
	'cs!/models/user',
	'cs!/models/comment',
	'cs!/models/activity',
	'cs!/views/post',
	'cs!/views/comment',
	'cs!/views/comments_thread'	,
	'cs!/views/activity'	,	
	'cs!/views/activity_stream'
	
], function(){
	"use strict";
	mocha
		.run(function(){
			$("#playarea").hide()
		});		
});

