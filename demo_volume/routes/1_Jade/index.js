module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {
      description: 'This value was set on the server on '+ new Date()
    });
  });

  return {
    //Required
    name: 'Jade',
    description: "<h2>Jade is used for the most complete example</h2>" +
    "<p>Its used for the layout of this main page, and of course its own page." +
    "These examples show the most complete" +
    "usage of all of the features built into Littoral." +
    "Most of the semi-complicated usage can be accomplished with" +
    "handlebars just as easily, I just happen to like Jade a bit better.</p>",
    basePath: '/jade',
    //Optional
    teaserImage: 'jade.png'
  }
};