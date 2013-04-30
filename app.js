var microcommunity = require('microcommunity')
	, basic = require('microcommunity-basic')
	, wiki = require('microcommunity-wiki')
	, uni = require('microcommunity-university')

var app = microcommunity.core()

//instaling plugins
app.use(basic)	
app.use(wiki)	
app.use(uni)

app = app.listen(3000)
