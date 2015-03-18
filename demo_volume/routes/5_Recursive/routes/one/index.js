module.exports = function(router){
  router.get('/', function(req, res){
    res.render('index');
  });

  return {
    //Required
    name: 'Further nesting',
    description: "<h2>Recursive routes</h2>",
    title: 'Nesting',
    basePath: '/one',
    //Optional
    teaserImage: 'cute.jpg'
  }
};