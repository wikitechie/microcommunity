var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	//, wiki = require('microcommunity-wiki')
	//, files = require('microcommunity-files')	
	, uni = require('microcommunity-university')


var app = microcommunity.core()

//instaling plugins
app.use(basic)	
//app.use(wiki)
//app.use(files)
app.use(uni)

app = app.listen(3000)
