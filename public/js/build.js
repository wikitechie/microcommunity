({

	appDir : "../js",
	baseUrl: '.',
	dir : '../compiled',
	
  paths: {
    cs: 'cs',
    'coffee-script': 'coffee-script',
    jquery : 'lib/jquery.min',
    backbone : 'lib/backbone.min',
    underscore: 'lib/underscore.min',
    bootstrap: 'lib/bootstrap.min',
    'jquery.gravatar': 'lib/jquery.gravatar',
    'jquery.spin': 'lib/jquery.spin',
    'spin': 'lib/spin.min',
    'md5' : 'lib/md5',
    'general' : 'lib/general',
    'moment' : 'lib/moment.min',
    'diff' : 'lib/diff'
  },
  
  mainConfigFile: 'main.js',
  
  optimize: "none",  
  
  modules: [
  	{
  		name : 'main',
  		exclude: ['coffee-script']
  	}
  ]

})
