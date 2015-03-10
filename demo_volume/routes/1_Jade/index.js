module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {
      description: 'This value was set on the server on '+ new Date()
    });
  });

  return {
    //Required
    name: 'Jade Templating.',
    description: "<h2>Jade is used for the most complete example</h2>",
    title: 'Jade',
    basePath: '/jade',
    //Optional
    teaserImage: 'jade.png'
  }
};