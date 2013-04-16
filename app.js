var microcommunity = require('./core')
	, basic = require('./lib/basic')

var app = microcommunity()

//instaling plugins
app.use(basic)	

app = app.listen(3000)
