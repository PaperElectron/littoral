module.exports = function(router){
  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    //Required
    name: 'App structure.',
    description: "<h2>Recursive route building</h2>",
    title: 'Jade',
    basePath: '/one',
    //Optional
    teaserImage: 'jade.png'
  }
};