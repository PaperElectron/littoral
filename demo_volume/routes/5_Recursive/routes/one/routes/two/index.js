module.exports = function(router){
  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    //Required
    name: 'Final Level',
    description: "<h2>But we can go further.</h2>",
    title: 'Parliament',
    basePath: '/two',
    //Optional
    teaserImage: 'more_owls.jpg'
  }
};