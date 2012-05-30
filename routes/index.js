
/*
 * GET home page.
 */

exports.index = function(req, res){

  res.render('index', { title: 'MicroCmmunity', posts : [{name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}] });
};

