var mongoose = require('mongoose')
  , passport = require('passport')  
  , flash = require('connect-flash')
  , _ = require('underscore')
  , LocalStrategy = require('passport-local').Strategy
  , async = require('async'); 

mongoose.connect('mongodb://localhost/microcommunity');

var Wikipage = mongoose.model('Wikipage', new mongoose.Schema({
  title: String,
  body: String
}));


exports.show = function(req,res){
  return Wikipage.findById(req.params.wikipage, function(err, wikipage) {
    if (!err) {
      return res.send(wikipage);
    }
  });
};

exports.index = function(req,res){
  return Wikipage.find(function(err, wikipages) {
    return res.send(wikipages);
  });
};

exports.update = function(req,res){
  return Wikipage.findById(req.params.id, function(err, wikipage) {
    wikipage.title = req.body.title;
    wikipage.body = req.body.body;
    return wikipage.save(function(err) {
      if (!err) {
        console.log("updated");
      }
      return res.send(wikipage);
    });
  });
};

exports.create = function(req,res){
  var wikipage;
  wikipage = new Wikipage({
    title: req.body.title,
    body: req.body.body

  });
  wikipage.save(function(err) {
    if (!err) {
      return console.log("created");
    }
  });
  return res.send(wikipage);
};


