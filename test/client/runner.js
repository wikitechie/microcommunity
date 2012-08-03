require([
	'cs!/models/post',
	'cs!/models/user',
	'cs!/models/comment',
	'cs!/models/activity',
	'cs!/views/post',
	'cs!/views/comment',
	'cs!/views/comments_thread'	
	
], function(){
	"use strict";
	mocha
		.run();
});

