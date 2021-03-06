module.exports = function(router){

  router.get('/', function(req, res){
    res.render('index', {
      description: 'This value was set on the server on '+ new Date()
    });
    console.log();
  });

  return {
    //Required
    name: 'Recursive Routes',
    description: "<h2>Nest to your hearts content</h2>",
    title: 'Recursive',
    basePath: '/recursive',
    //Optional
    teaserImage: 'https://forgifs.com/gallery/d/193499-4/Sunglasses-reaction-recursion.gif'
  }
};