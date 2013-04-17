var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, wiki = require('microcommunity-wiki')

var app = microcommunity.core()

//instaling plugins
app.use(basic)	
app.use(wiki)	

app = app.listen(3000)
