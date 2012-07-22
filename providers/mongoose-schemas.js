var mongoose = require('mongoose');

exports.Post = mongoose.model('Post', new mongoose.Schema({
	user: mongoose.Schema.ObjectId, 
  name: String,
  text: String,
  comments : [exports.Comments],
  created_at : Date
}));

exports.Comments = new mongoose.Schema({
    name     : String
  , text      : String
  , user : mongoose.Schema.ObjectId
  , created_at : Date
});


exports.User = mongoose.model('User', new mongoose.Schema({
	email: String,
	password: String
}));

