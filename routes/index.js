
/*
 * GET home page.
 */

exports.index = function(req, res){

	res.expose([{name: "Tamer", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}], 'myposts');

  res.render('index', { title: 'MicroCmmunity', posts : [{name: "Amjad", text: "Hello, Backbone"}, {name: "Amjad", text: "Hello, Backbone"}] });
};

