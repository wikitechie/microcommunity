var microcommunity = require('microcommunity')

//registering models
require('./models/file')

var app = module.exports = microcommunity.plugin(__dirname)
