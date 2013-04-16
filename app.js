var microcommunity = require('./microcommunity')
	, basic = require('./lib/basic')

var app = microcommunity.core()

//instaling plugins
app.use(basic)	

app = app.listen(3000)
