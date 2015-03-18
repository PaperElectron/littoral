module.exports = function(router){
  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    //Required
    name: 'Un-nested',
    description: "<h2>Stop wherever</h2>",
    title: 'Plain App',
    basePath: '/two',
    //Optional
    teaserImage: 'owlskate.jpg'
  }
};