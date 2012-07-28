({

	appDir : "../js",
	baseUrl: '.',
	dir : '../final',
	
  paths: {
    cs: 'cs',
    'coffee-script': 'coffee-script',
    jquery : 'lib/jquery.min',
    backbone : 'lib/backbone.min',
    underscore: 'lib/underscore.min',
    bootstrap: 'lib/bootstrap.min'
  },
  
  optimize: "none",  
  
  modules: [
  	{
  		name : 'main',
  		exclude: ['coffee-script']
  	}
  ]

})
